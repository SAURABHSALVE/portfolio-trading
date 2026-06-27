// Each content block: { type, text?, items?, lang? }
// type: 'h2' | 'h3' | 'p' | 'code' | 'highlight' | 'list' | 'tip'

export const BLOG_POSTS = [
  /* ── FEATURED ─────────────────────────────────────────────────────── */
  {
    slug: 'agentic-image-studio-architecture',
    title: 'Building a 9-Agent AI Image Studio: Architecture & Lessons',
    category: 'GenAI',
    tags: ['Multi-Agent', 'PyTorch', 'Diffusers', 'LCM', 'Stable Diffusion'],
    date: 'Mar 2025',
    readTime: '12 min read',
    featured: true,
    excerpt:
      'How I architected a multi-agent system that orchestrates prompt refinement, quality control, and iterative improvement — and why Latent Consistency Models changed everything about inference speed.',
    stats: [
      { num: '10x', label: 'Inference speedup via LCM' },
      { num: '9', label: 'Specialized agents designed' },
    ],
    content: [
      { type: 'highlight', text: 'This post is a deep-dive into the architecture of my Agentic AI Image Studio — a system of 9 cooperating agents that generates, evaluates, and improves images autonomously.' },
      { type: 'h2', text: 'Why Multi-Agent for Image Generation?' },
      { type: 'p', text: 'A single prompt-to-image call is fragile. You get one shot at a good result. If the prompt is ambiguous, the seed is unlucky, or the quality metric is off — you loop manually. That loop is exactly what agents are good at automating.' },
      { type: 'p', text: 'The idea came from LangChain\'s agent loop: a planner decides what tool to call, the tool runs, the result feeds back. I adapted that loop specifically for image generation with Stable Diffusion, adding specialized agents for each concern instead of one monolithic runner.' },
      { type: 'h2', text: 'The 9-Agent Architecture' },
      { type: 'h3', text: '1. Prompt Refiner Agent' },
      { type: 'p', text: 'Accepts raw user input and enriches it using a local LLM (or GPT-4). Adds art style descriptors, lighting cues, composition keywords, and negative prompt hints. This single step improved output consistency dramatically.' },
      { type: 'code', lang: 'python', text: `def refine_prompt(raw: str, style: str = "photorealistic") -> dict:
    system = "You are an expert prompt engineer for Stable Diffusion."
    user = f"""Improve this prompt for {style} image generation.
Raw: {raw}
Return JSON: {{"positive": "...", "negative": "...", "style_tags": [...]}}"""
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": system},
                  {"role": "user", "content": user}],
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)` },
      { type: 'h3', text: '2. Style Analyzer Agent' },
      { type: 'p', text: 'Takes the refined prompt and classifies the intended visual style (photorealistic, anime, oil painting, etc.). This drives model selection — different LoRA weights are loaded depending on the style bucket.' },
      { type: 'h3', text: '3. Negative Prompt Generator' },
      { type: 'p', text: 'A dedicated agent for negative prompts. It pulls from a curated library of universal negatives (blurry, deformed hands, watermark...) and adds style-specific negatives. Keeping this separate makes the negative prompt maintainable and extensible.' },
      { type: 'h3', text: '4. Seed Manager Agent' },
      { type: 'p', text: 'Manages seed selection and variation strategy. For first generation, it picks 4 diverse seeds. After quality evaluation, it perturbs the best seed ±50 to explore nearby latent space — a technique I borrowed from evolutionary algorithms.' },
      { type: 'h3', text: '5. Quality Control Agent' },
      { type: 'p', text: 'Evaluates each generated image using CLIP score (text-image alignment) and a lightweight aesthetic scorer (LAION aesthetic predictor). Images below threshold are flagged for regeneration. This closed the feedback loop.' },
      { type: 'code', lang: 'python', text: `def evaluate_image(image: PIL.Image, prompt: str) -> dict:
    # CLIP alignment score
    inputs = clip_processor(text=[prompt], images=image, return_tensors="pt")
    outputs = clip_model(**inputs)
    clip_score = outputs.logits_per_image.item()

    # Aesthetic score (LAION aesthetic predictor)
    aesthetic_score = aesthetic_model(preprocess(image).unsqueeze(0)).item()

    return {
        "clip_score": clip_score,
        "aesthetic_score": aesthetic_score,
        "passed": clip_score > 0.28 and aesthetic_score > 5.5
    }` },
      { type: 'h3', text: '6. Iteration Agent (Orchestrator)' },
      { type: 'p', text: 'The brain of the system. It reads quality reports, decides whether to regenerate, refine the prompt, or switch style. It runs up to 3 iteration cycles before returning the best result. This is where the "agentic" behaviour really happens.' },
      { type: 'h3', text: '7. Cache Manager Agent' },
      { type: 'p', text: 'Maintains a prompt hash → image cache. Before any generation, the cache is checked. This reduced redundant GPU calls by ~30% during development.' },
      { type: 'h3', text: '8. Format Converter Agent' },
      { type: 'p', text: 'Handles output format: PNG, JPEG at specified quality, WebP, or base64-encoded string for API responses. Decouples format concerns from generation logic.' },
      { type: 'h3', text: '9. Metadata Agent' },
      { type: 'p', text: 'Embeds generation metadata (prompt, seed, model, timestamp, scores) into the image EXIF data. Essential for reproducibility — I could always recreate any output exactly.' },
      { type: 'h2', text: 'Why LCM Changed Everything' },
      { type: 'p', text: 'Standard Stable Diffusion requires 20–50 denoising steps per image. At 30 steps on a single T4 GPU, that\'s ~8 seconds per 512×512 image. With 4 seeds per iteration cycle × 3 cycles, each generation request could take over 2 minutes. Unusable.' },
      { type: 'p', text: 'Latent Consistency Models (LCM) distill the diffusion process into 4–8 steps while preserving quality. The result: ~0.7 seconds per image. The agent loop went from minutes to under 15 seconds end-to-end.' },
      { type: 'code', lang: 'python', text: `from diffusers import LCMScheduler, AutoPipelineForText2Image

pipe = AutoPipelineForText2Image.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16
)
pipe.scheduler = LCMScheduler.from_config(pipe.scheduler.config)
pipe.load_lora_weights("latent-consistency/lcm-lora-sdxl")
pipe.fuse_lora()

# 4-8 steps vs 30-50 for standard SD
image = pipe(prompt, num_inference_steps=4, guidance_scale=1.0).images[0]` },
      { type: 'highlight', text: 'The key insight: LCM guidance_scale should be 1.0–2.0 (not the 7.5 default). Higher values cause over-saturation. This took me a full day to debug.' },
      { type: 'h2', text: 'Results & Benchmarks' },
      { type: 'list', items: [
        'Average end-to-end generation time: 13.2 seconds (vs ~140s with standard SD)',
        'CLIP score improvement after prompt refinement: +18% average',
        'Quality pass rate on first iteration: 71% — remaining 29% resolved in iteration 2',
        'Cache hit rate after warm-up: 34% (significant GPU savings during demos)',
      ]},
      { type: 'h2', text: 'Key Lessons' },
      { type: 'list', items: [
        'Agent boundaries matter: each agent should do exactly one thing. Combining prompt refinement and quality evaluation into one agent made debugging a nightmare.',
        'Async execution for parallel seeds: generating 4 seeds sequentially was wasteful. asyncio + thread pools cut that to near-single-seed time.',
        'LCM is not free: quality at 4 steps is slightly lower than 30-step SD. For casual use it\'s fine; for print-quality, you still need more steps.',
        'Cache invalidation is hard even with a hash — prompt normalization (lowercase, strip, sort tags) was essential to get real cache hits.',
      ]},
    ],
  },

  /* ── POST 01 ───────────────────────────────────────────────────────── */
  {
    slug: 'rag-production-youtube-bot',
    title: 'RAG in Production: What I Learned Building the YouTube Bot',
    category: 'GenAI',
    tags: ['RAG', 'LangChain', 'FAISS', 'OpenAI', 'Streamlit'],
    date: 'Jan 2025',
    readTime: '6 min read',
    featured: false,
    excerpt:
      'The real challenges of building a RAG pipeline that handles PDF knowledge bases + live web search — chunking strategies, FAISS indexing, and getting LangChain agents to actually work reliably.',
    content: [
      { type: 'highlight', text: 'RAG sounds simple in tutorials. In production it exposes a dozen sharp edges. Here\'s what I actually hit building the YouTube Bot RAG agent.' },
      { type: 'h2', text: 'The Problem with Naive RAG' },
      { type: 'p', text: 'Most tutorials show you: load PDF → split into chunks → embed → store → query. This works for demos. It breaks in production for three reasons: chunking strategy is wrong, retrieval returns irrelevant context, and there\'s no fallback when the knowledge base doesn\'t have the answer.' },
      { type: 'h2', text: 'Chunking Strategy: The Most Underrated Decision' },
      { type: 'p', text: 'I started with fixed-size 1000-character chunks with 200-character overlap. Retrieval was terrible — chunks would cut through sentences mid-thought, breaking semantic coherence.' },
      { type: 'p', text: 'Switching to `RecursiveCharacterTextSplitter` with 512 tokens and 50-token overlap, prioritising splits at paragraph boundaries (`\\n\\n`), then sentences (`.`), then words — improved retrieval quality measurably.' },
      { type: 'code', lang: 'python', text: `from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", ". ", " ", ""],
    length_function=len,
)
chunks = splitter.split_documents(docs)` },
      { type: 'h2', text: 'FAISS: Right Config Matters' },
      { type: 'p', text: 'Default FAISS `IndexFlatL2` is fine for small corpora (<10K vectors). For larger knowledge bases, switch to `IndexIVFFlat` with `nlist=100` clusters. The difference in query time is significant at scale.' },
      { type: 'p', text: 'Always normalise embeddings before storing (`text-embedding-ada-002` returns unit vectors, so cosine and L2 are equivalent — but other models don\'t). I added explicit L2 normalisation to be safe.' },
      { type: 'h2', text: 'Hybrid Retrieval: Vector + Keyword' },
      { type: 'p', text: 'Pure vector search misses exact keyword matches. A query for "GPT-4 pricing" might retrieve semantically similar content about "LLM cost comparison" but miss the exact pricing table. I implemented a simple keyword filter as a pre-step:' },
      { type: 'list', items: [
        'Run BM25 keyword search over chunk texts → top 20 results',
        'Run FAISS vector search → top 20 results',
        'Re-rank the union using Reciprocal Rank Fusion (RRF)',
        'Pass top 5 to the LLM',
      ]},
      { type: 'h2', text: 'The Live Web Search Fallback' },
      { type: 'p', text: 'When retrieval confidence is low (CLIP-style relevance score < 0.7), the agent falls back to Tavily API for real-time web search. This is the key feature that makes the bot useful for questions beyond the knowledge base.' },
      { type: 'code', lang: 'python', text: `from langchain_community.tools.tavily_search import TavilySearchResults

tools = [
    retriever_tool,  # FAISS-backed
    TavilySearchResults(max_results=3, search_depth="advanced"),
]

agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent, tools=tools,
    verbose=True, handle_parsing_errors=True,
    max_iterations=5,
)` },
      { type: 'h2', text: 'What I\'d Do Differently' },
      { type: 'list', items: [
        'Add a query rewriting step before retrieval (LLM rewrites the user question for better embedding match)',
        'Use a cross-encoder re-ranker (e.g., ms-marco-MiniLM) instead of RRF',
        'Implement confidence scoring to know when NOT to answer (hallucination prevention)',
        'Cache embeddings to disk — re-embedding on every restart costs time and money',
      ]},
    ],
  },

  /* ── POST 02 ───────────────────────────────────────────────────────── */
  {
    slug: 'ann-vs-cnn-vs-procnn-mnist',
    title: 'ANN vs CNN vs ProCNN: A Practical Comparison on MNIST',
    category: 'Machine Learning',
    tags: ['PyTorch', 'CNN', 'ANN', 'Deep Learning', 'Streamlit'],
    date: 'Dec 2024',
    readTime: '8 min read',
    featured: false,
    excerpt:
      'I trained three architectures on the same dataset and tracked everything — accuracy, confusion matrices, inference time. Here\'s what the numbers actually mean and when to use each.',
    content: [
      { type: 'highlight', text: 'Not all neural networks are created equal. Even on MNIST — arguably the "Hello World" of deep learning — architecture choices matter more than most tutorials suggest.' },
      { type: 'h2', text: 'Setup' },
      { type: 'p', text: 'MNIST: 60,000 training images, 10,000 test images, 28×28 grayscale, 10 classes. Same training loop for all three models: Adam optimizer, lr=0.001, 20 epochs, batch size 64, CrossEntropyLoss. No data augmentation (intentional — I wanted to isolate architecture effects).' },
      { type: 'h2', text: 'Architecture 1: ANN (Fully Connected)' },
      { type: 'p', text: 'The simplest approach: flatten the 784-pixel image and pass through dense layers.' },
      { type: 'code', lang: 'python', text: `class ANN(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Flatten(),
            nn.Linear(784, 256), nn.ReLU(),
            nn.Linear(256, 128), nn.ReLU(),
            nn.Linear(128, 64),  nn.ReLU(),
            nn.Linear(64, 10)
        )
    def forward(self, x): return self.net(x)` },
      { type: 'p', text: 'Result: 97.8% test accuracy. Trains fast (8s/epoch on CPU). The bottleneck: it treats each pixel independently. Spatial relationships between neighbouring pixels are lost in the flatten operation.' },
      { type: 'h2', text: 'Architecture 2: CNN' },
      { type: 'p', text: 'Convolutional layers exploit spatial locality — nearby pixels are processed together by the same filter.' },
      { type: 'code', lang: 'python', text: `class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, 3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 128), nn.ReLU(),
            nn.Linear(128, 10)
        )
    def forward(self, x):
        return self.classifier(self.features(x))` },
      { type: 'p', text: 'Result: 99.1% test accuracy. Trains slower (22s/epoch on CPU) but the accuracy jump is real. Filter visualisations show learned edge detectors and curve detectors — meaningful features, not arbitrary pixel weights.' },
      { type: 'h2', text: 'Architecture 3: ProCNN (Production CNN)' },
      { type: 'p', text: 'The same CNN backbone with two additions: BatchNorm after each conv layer (training stability) and Dropout before the final classifier (regularisation).' },
      { type: 'code', lang: 'python', text: `class ProCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, 3, padding=1),
            nn.BatchNorm2d(32), nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1),
            nn.BatchNorm2d(64), nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.4),
            nn.Linear(64 * 7 * 7, 128), nn.ReLU(),
            nn.Linear(128, 10)
        )` },
      { type: 'p', text: 'Result: 99.4% test accuracy. More importantly: the loss curve was smoother, and when tested with Gaussian-noised digits (simulating real-world scan quality), ProCNN degraded 60% less than plain CNN. BatchNorm acts as a normalising buffer against input distribution shift.' },
      { type: 'h2', text: 'Results Comparison' },
      { type: 'list', items: [
        'ANN: 97.8% accuracy | 8s/epoch | 407K parameters',
        'CNN: 99.1% accuracy | 22s/epoch | 421K parameters',
        'ProCNN: 99.4% accuracy | 25s/epoch | 422K parameters',
        'On noisy digits (+15% Gaussian noise): ANN 89%, CNN 94%, ProCNN 97%',
      ]},
      { type: 'h2', text: 'When to Use Each' },
      { type: 'list', items: [
        'ANN: tabular data, simple patterns, very limited compute',
        'CNN: any image or spatial data where local patterns matter',
        'ProCNN (CNN + BN + Dropout): production models, noisy real-world inputs, when you need the model to generalise beyond the training distribution',
      ]},
      { type: 'tip', text: 'Lesson: BatchNorm is almost always worth adding. The training time overhead is minimal, but stability and noise robustness gains are real. Make it the default.' },
    ],
  },

  /* ── POST: TRANSFORMERS IN 60 SECONDS ────────────────────────────────── */
  {
    slug: 'transformers-in-60-seconds',
    title: 'Learn Transformers in Just 60 Seconds',
    category: 'Machine Learning',
    tags: ['Transformers', 'Attention', 'Deep Learning', 'NLP'],
    date: 'Jun 2026',
    readTime: '2 min read',
    featured: false,
    excerpt:
      'Self-attention, multi-head attention, and positional encoding — the three ideas that power every modern LLM, explained as fast as humanly possible.',
    content: [
      { type: 'highlight', text: 'Every LLM you\'ve used — GPT, Gemini, Claude — is built on the Transformer architecture. Here\'s the entire idea, stripped down to the essentials.' },
      { type: 'h2', text: 'The Core Idea: Attention' },
      { type: 'p', text: 'Older models (RNNs) read text one word at a time, left to right, like a tape. By the time they reached word 50, they\'d half-forgotten word 1. Transformers throw that away: every word looks at every other word in the sentence, all at once, and decides how much to "pay attention" to each one.' },
      { type: 'p', text: 'Concretely: each word is turned into three vectors — Query (what am I looking for?), Key (what do I contain?), and Value (what information do I carry?). A word\'s new representation is a weighted sum of all Values, where the weights come from comparing its Query against every other word\'s Key.' },
      { type: 'code', lang: 'python', text: `# Simplified self-attention
scores = Q @ K.T / sqrt(d_k)        # how much each word relates to every other word
weights = softmax(scores, dim=-1)   # turn scores into probabilities
output = weights @ V                # blend values according to attention` },
      { type: 'h2', text: 'Multi-Head Attention: Many Perspectives at Once' },
      { type: 'p', text: 'One attention pass might learn "which word is the subject of this verb." Another might learn "which adjective describes this noun." Instead of picking one, Transformers run several attention "heads" in parallel — each learning a different relationship — then concatenate the results.' },
      { type: 'h2', text: 'Positional Encoding: Teaching Order Without Sequence' },
      { type: 'p', text: 'Since attention looks at all words simultaneously, it has no built-in sense of order — "dog bites man" and "man bites dog" would look identical. The fix: add a unique positional signal (sine/cosine waves of different frequencies) to each word\'s embedding, so position 1 and position 2 become distinguishable.' },
      { type: 'h2', text: 'Stack, Repeat, Done' },
      { type: 'p', text: 'A Transformer block = multi-head attention + a small feed-forward network, wrapped with residual connections and layer normalisation. Stack a dozen (or a hundred) of these blocks, train on enough text, and you get GPT-style models.' },
      { type: 'list', items: [
        'Self-attention: every token looks at every other token, weighted by relevance',
        'Multi-head: run attention multiple times in parallel for different relationships',
        'Positional encoding: injects word order since attention alone is order-agnostic',
        'Stack N blocks → scale data + parameters → modern LLMs',
      ]},
      { type: 'tip', text: 'If you remember one thing: attention = "for every word, build a custom blend of every other word, weighted by how relevant it is right now." Everything else in the Transformer exists to make that idea trainable, parallel, and order-aware.' },
    ],
  },

  /* ── POST: NATURAL LANGUAGE PROCESSING ──────────────────────────────────── */
  {
    slug: 'natural-language-processing-nlp',
    title: 'Natural Language Processing: Teaching Computers to Understand You',
    category: 'Machine Learning',
    tags: ['NLP', 'AI', 'Language', 'Deep Learning', 'Transformers'],
    date: 'Jun 2026',
    readTime: '8 min read',
    featured: false,
    excerpt:
      'NLP is the AI behind every chatbot, translator, and spam filter. Here\'s how computers actually read, understand, and reply — from tokenization to transformers.',
    content: [
      { type: 'image', src: '/nlp-hero.png', alt: 'Natural Language Processing Overview', caption: 'NLP bridges human language and machine understanding through tokenization, syntax parsing, and semantic analysis.' },
      { type: 'highlight', text: 'You asked your phone for directions, got an answer in seconds, and didn\'t think twice. But somewhere in there, a computer read your words and actually understood you. That\'s NLP — and it\'s way more fascinating than it sounds.' },
      { type: 'h2', text: 'What is NLP?' },
      { type: 'p', text: 'NLP is like teaching a computer to read, understand, and reply — just like a human would. Formally: it\'s the branch of AI that enables machines to process and generate human language.' },
      { type: 'p', text: 'Here\'s the magic: when you send a text, your phone doesn\'t just store the letters. It breaks the message into meaningful pieces, figures out what you\'re asking, and constructs a sensible reply. Every time you use a chatbot, translator, or voice assistant, NLP is working behind the scenes.' },
      { type: 'h2', text: 'The Building Blocks' },
      { type: 'h3', text: '1. Tokenization: Breaking Words Into Pieces' },
      { type: 'p', text: 'A computer can\'t process "hello" directly. It needs to chop text into tokens — chunks small enough to encode. Tokens can be words ("hello"), characters ("h", "e", "l", "l", "o"), or subwords ("hel", "lo"). The strategy depends on the language and model.' },
      { type: 'p', text: 'Modern NLP uses subword tokenization (BPE or WordPiece). Why? Because rare words get broken into common pieces. The word "unbelievable" might tokenize as ["un", "believe", "able"]. This lets the model handle new words it\'s never seen.' },
      { type: 'h3', text: '2. Part-of-Speech Tagging: Labeling Roles' },
      { type: 'p', text: 'Every word plays a role: noun, verb, adjective. "Run" is different in "I run" (verb) vs "I\'m on a run" (noun). Tagging these roles helps the model understand structure.' },
      { type: 'p', text: 'Example: "The quick brown fox jumps" → [Article, Adjective, Adjective, Noun, Verb]. Knowing the structure guides meaning.' },
      { type: 'h3', text: '3. Named Entity Recognition: Finding Real Things' },
      { type: 'p', text: 'When you ask "Where is Eiffel Tower?", the model needs to know "Eiffel Tower" is a location, not just two random words. NER spots entities (people, places, organisations, dates) in text.' },
      { type: 'p', text: 'It\'s the difference between understanding "Alice works at Google" (person → location) vs missing it entirely.' },
      { type: 'h3', text: '4. Syntax Parsing: Understanding Structure' },
      { type: 'p', text: '"A dog chased a cat" and "A cat chased a dog" have the same words but opposite meanings. Syntax parsing builds a tree of relationships: who did what to whom.' },
      { type: 'h3', text: '5. Sentiment Analysis: Reading Emotion' },
      { type: 'p', text: 'Can a computer tell if "This pizza is amazing!" is praise or "This pizza is a crime" is criticism? Sentiment analysis scores emotional tone: positive, negative, neutral. It\'s trickier than keyword matching — sarcasm and negation flip meaning.' },
      { type: 'h3', text: '6. Semantic Understanding: Grasping Meaning' },
      { type: 'p', text: 'This is the hard part. It\'s not enough to tag words; the model needs to understand relationships. "I love coffee on rainy days" contains meaning: subject (I), action (love), object (coffee), context (rainy days). Modern NLP models learn these relationships from billions of examples.' },
      { type: 'h2', text: 'NLP in Real Life (And You Already Use It)' },
      { type: 'p', text: 'NLP is everywhere. You\'ve been using it without realizing:' },
      { type: 'list', items: [
        'Spam filters: NLP models learn patterns of spam language and flag suspicious emails.',
        'Google Search autocomplete: predicts what you\'re about to type using language patterns.',
        'Netflix subtitles in multiple languages: machine translation powered by NLP.',
        'Your phone\'s predictive text: guesses your next word based on context.',
        'Chatbots (ChatGPT, Google Bard, Claude): generate human-like responses using NLP.',
        'Recommendation systems: analyse your interest from text (reviews, comments, profile) to suggest content.',
      ]},
      { type: 'h2', text: 'The Evolution of NLP (For the Curious)' },
      { type: 'p', text: 'The field has three acts:' },
      { type: 'p', text: '📖 Act 1 (1990s-2010s): Rule-based systems. Linguists wrote rules: "if text contains \'buy\', it\'s commerce." This worked until edge cases exploded. You can\'t manually write rules for every language variation.' },
      { type: 'p', text: '📊 Act 2 (2010s): Statistics. Machine learning models learned patterns from examples. Feed in 1 million tagged emails, the model learns to spot spam. Better than rules, but still limited to patterns in training data.' },
      { type: 'p', text: '🧠 Act 3 (2017-present): Neural Networks and Transformers. Self-attention — the breakthrough in 2017\'s "Attention Is All You Need" paper — let models look at all words simultaneously, weighted by relevance. This enabled GPT, BERT, and modern LLMs. Suddenly, NLP could handle nuance, context, and ambiguity.' },
      { type: 'h2', text: 'How Modern NLP Actually Works' },
      { type: 'p', text: 'Here\'s the simplified pipeline:' },
      { type: 'list', items: [
        '1. Input: You say "What\'s the best pizza near me?"',
        '2. Tokenize: ["What\'s", "the", "best", "pizza", "near", "me", "?"]',
        '3. Embed: Convert each token to a vector (a list of numbers). Vectors encode meaning — "pizza" and "food" are close together in space.',
        '4. Process through neural layers: Attention layers learn relationships. Which words matter most? ("best" and "pizza" are key; "the" is filler.)',
        '5. Extract meaning: Intent = FIND_LOCATION, Entity = food:pizza, Modifiers = quality:best',
        '6. Generate response: Model generates "Mario\'s Pizza is the highest-rated place 2 minutes away."',
      ]},
      { type: 'p', text: 'Each step involves neural networks learning from examples. The more examples, the better it generalises.' },
      { type: 'h2', text: 'The Honest Challenges' },
      { type: 'p', text: 'NLP still stumbles in real-world situations:' },
      { type: 'list', items: [
        'Sarcasm & irony: "Oh great, another Monday" — a model might think you\'re happy, not sarcastic.',
        'Ambiguity: "I saw the man with the telescope." (Did you use the telescope to see the man, or was he holding it?) Humans infer from context; models sometimes miss it.',
        'Slang & dialects: Text from Gen Z uses abbreviations (ngl, fax, no cap) that older training data didn\'t include.',
        'Low-resource languages: English has billions of training examples. Icelandic has millions. Building good NLP for minority languages is harder.',
        'Bias in training data: If the training data reflects human biases, the model inherits them. This is an active research area.',
      ]},
      { type: 'h2', text: 'Try It Yourself' },
      { type: 'p', text: 'Want to experiment? Try HuggingFace Spaces (free, no code required):' },
      { type: 'list', items: [
        'Go to huggingface.co/spaces',
        'Search "sentiment-analysis" and pick any model',
        'Paste a sentence: "This product changed my life!" — the model scores it positive or negative',
        'Try sarcasm: "Oh wow, I love waiting" — see if the model gets fooled',
        'Experiment with edge cases and notice where it fails. That\'s where the interesting research happens.',
      ]},
      { type: 'h2', text: 'The Future of NLP' },
      { type: 'p', text: 'Three trends to watch:' },
      { type: 'p', text: 'Multimodal AI: Models that understand text + images + audio together. "Show me a cat" becomes easier when the model can see cats too.' },
      { type: 'p', text: 'Real-time translation: Breaking language barriers completely. Imagine talking to anyone in the world and hearing fluent conversation in your language, instantly.' },
      { type: 'p', text: 'Reasoning + language: Today\'s NLP is good at pattern matching. Future models will chain logical steps, making them better at math, coding, and complex reasoning.' },
      { type: 'image', src: '/nlp-pipeline.png', alt: 'NLP Processing Pipeline', caption: 'The end-to-end NLP pipeline: from human input through tokenization, processing, and understanding to meaningful output.' },
      { type: 'h2', text: 'Your Next Move' },
      { type: 'p', text: 'If you\'re curious about NLP:' },
      { type: 'list', items: [
        'Play with HuggingFace. Try sentiment analysis, text classification, or translation. 10 minutes of hands-on beats hours of reading.',
        'Read "Attention Is All You Need" (the Transformers paper). It\'s dense, but the first two sections explain the breakthrough clearly.',
        'Build something small: a spam detector, a sentiment classifier for movie reviews, a simple chatbot. Writing code cements understanding.',
      ]},
      { type: 'p', text: '✨ Ready to explore? Start with HuggingFace and pick a simple task. You\'ll understand NLP way better by doing than by reading — and you\'ll probably have fun along the way.' },
    ],
  },

  /* ── POST: SPEED OF LIGHT ─────────────────────────────────────────────── */
  {
    slug: 'speed-of-light',
    title: 'What Happens as You Approach the Speed of Light?',
    category: 'Physics',
    tags: ['Special Relativity', 'Physics'],
    date: 'Jun 2026',
    readTime: '5 min read',
    featured: false,
    excerpt:
      'A plain-English tour of Einstein\'s Special Relativity — why time slows down, distances shrink, and nothing with mass can ever quite reach c.',
    content: [
      { type: 'highlight', text: 'Special Relativity isn\'t about things looking fast — it\'s about space and time themselves bending as speed increases.' },
      { type: 'h2', text: 'The Speed Limit of the Universe' },
      { type: 'p', text: 'Light travels at roughly 299,792 kilometres per second (≈ 1.08 billion km/h). Einstein\'s 1905 theory of Special Relativity starts from one strange but experimentally confirmed fact: every observer, no matter how fast they\'re moving, measures the speed of light as exactly the same value. To make that consistent, something else has to give — and that something is space and time.' },
      { type: 'h2', text: 'Time Dilation: Clocks Run Slow' },
      { type: 'p', text: 'As an object\'s speed approaches c, time for that object slows down relative to a stationary observer. A clock on a spaceship moving at 90% of light speed ticks noticeably slower than one on Earth — not because anything is broken, but because time itself is stretching.' },
      { type: 'p', text: 'This is captured by the Lorentz factor, γ (gamma):' },
      { type: 'code', lang: 'text', text: 'γ = 1 / √(1 − v²/c²)' },
      { type: 'p', text: 'At 50% of c, γ ≈ 1.15. At 99% of c, γ ≈ 7.1. At 99.999% of c, γ ≈ 224. The closer v gets to c, the faster γ — and the time-dilation effect — blows up toward infinity.' },
      { type: 'h2', text: 'Length Contraction: Distances Shrink' },
      { type: 'p', text: 'The same factor works in reverse for distance. To an observer moving at high speed, objects (and the distance to them) appear contracted along the direction of motion by a factor of 1/γ. A 100-light-year journey could feel like just a few years to a traveler moving close to c — even though Earth observers still see the trip take ~100 years.' },
      { type: 'h2', text: 'Why You Can Never Reach c' },
      { type: 'p', text: 'As an object with mass speeds up, the energy needed to accelerate it further grows — and grows faster the closer it gets to c. The kinetic energy required is proportional to (γ − 1), which approaches infinity as v approaches c. To actually reach light speed, you\'d need infinite energy. That\'s why c isn\'t just a "fast" speed — it\'s a hard ceiling built into the structure of spacetime.' },
      { type: 'list', items: [
        'Time dilation: moving clocks run slow, by a factor of γ',
        'Length contraction: moving objects shrink along their direction of travel, by 1/γ',
        'Energy cost: accelerating toward c requires ever-increasing (eventually infinite) energy',
        'Only massless particles, like photons, can travel at exactly c',
      ]},
      { type: 'tip', text: 'GPS satellites actually have to correct for both effects — their clocks run faster due to weaker gravity (General Relativity) and slower due to their orbital speed (Special Relativity). Without these corrections, GPS positions would drift by kilometres per day.' },
    ],
  },

  /* ── POST 03 ───────────────────────────────────────────────────────── */
  {
    slug: 'resnet50-fastapi-docker-deployment',
    title: 'Deploying a ResNet50 API with Docker + FastAPI — End to End',
    category: 'Cloud / MLOps',
    tags: ['FastAPI', 'Docker', 'ResNet50', 'PyTorch', 'Computer Vision'],
    date: 'Nov 2024',
    readTime: '10 min read',
    featured: false,
    excerpt:
      'A full walkthrough of containerizing a PyTorch ResNet50 model, serving it via FastAPI, optimizing the preprocessing pipeline for concurrency, and getting 98% accuracy in production.',
    content: [
      { type: 'highlight', text: 'Training a model that achieves 98% accuracy locally means nothing if it crashes under load in production. This post covers every step from local model to cloud-ready API.' },
      { type: 'h2', text: 'Why ResNet50?' },
      { type: 'p', text: 'The Plant Disease Detection task (38 classes from PlantVillage) needs a model that generalises well across leaf textures, lighting conditions, and disease morphology. ResNet50\'s skip connections prevent vanishing gradients in deeper layers — critical for fine-grained visual classification where subtle texture differences matter.' },
      { type: 'p', text: 'I fine-tuned a pretrained ImageNet ResNet50, freezing all layers except the last two residual blocks + the final FC layer. This transfer learning approach reached convergence in 8 epochs instead of 40+ from scratch.' },
      { type: 'h2', text: 'FastAPI: The Right Tool for ML Serving' },
      { type: 'p', text: 'FastAPI\'s async support and automatic OpenAPI documentation make it ideal for ML APIs. The key: load the model once at startup, not per request.' },
      { type: 'code', lang: 'python', text: `from fastapi import FastAPI, UploadFile, File
from contextlib import asynccontextmanager
import torch, torchvision.transforms as T
from PIL import Image
import io

# Global model (loaded once at startup)
model = None
transform = T.Compose([
    T.Resize((224, 224)),
    T.ToTensor(),
    T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    model = torch.load("resnet50_plant.pth", map_location="cpu")
    model.eval()
    yield

app = FastAPI(lifespan=lifespan)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img = Image.open(io.BytesIO(await file.read())).convert("RGB")
    tensor = transform(img).unsqueeze(0)
    with torch.no_grad():
        logits = model(tensor)
    probs = torch.softmax(logits, dim=1)[0]
    top3 = probs.topk(3)
    return {
        "prediction": CLASS_NAMES[top3.indices[0]],
        "confidence": round(top3.values[0].item(), 4),
        "top3": [{"class": CLASS_NAMES[i], "prob": round(p.item(), 4)}
                 for i, p in zip(top3.indices, top3.values)]
    }` },
      { type: 'h2', text: 'Docker: Multi-Stage Build' },
      { type: 'p', text: 'A naive Docker image with all PyTorch dependencies balloons to 4GB+. A multi-stage build with CPU-only PyTorch brings it under 1.2GB — a 3× reduction that matters for cloud deployment costs.' },
      { type: 'code', lang: 'dockerfile', text: `FROM python:3.11-slim AS builder
WORKDIR /build
COPY requirements.txt .
RUN pip install --user --no-cache-dir \
    torch torchvision --index-url https://download.pytorch.org/whl/cpu \
    && pip install --user --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]` },
      { type: 'h2', text: 'Preprocessing Pipeline Optimisation' },
      { type: 'p', text: 'The bottleneck wasn\'t inference — it was image decoding. PIL is single-threaded. Under concurrent requests, decoding queued up.' },
      { type: 'list', items: [
        'Switched PIL decode to `torchvision.io.decode_jpeg` (uses libturbojpeg — 3× faster)',
        'Added input validation (file size < 10MB, MIME type check) before decode',
        'Used `torch.no_grad()` + `model.eval()` to skip gradient computation (obvious but often missed in tutorials)',
        'Added response caching for identical image hashes (prevents redundant inference on duplicate uploads)',
      ]},
      { type: 'h2', text: 'Load Testing Results' },
      { type: 'list', items: [
        '10 concurrent requests: 210ms average response time ✓',
        '50 concurrent requests: 890ms average — acceptable for the use case',
        '100 concurrent requests: queue buildup — solution: Celery task queue + Redis for async processing',
        '98.1% accuracy on 1,000 held-out test images across all 38 classes',
      ]},
      { type: 'tip', text: 'Always load-test your API before shipping. 100 concurrent users exposing a 10× performance cliff isn\'t a traffic problem — it\'s an architecture problem that needs fixing before launch.' },
    ],
  },

  /* ── POST 04 ───────────────────────────────────────────────────────── */
  {
    slug: 'prompt-engineering-vertex-ai',
    title: 'Prompt Engineering That Actually Works: Lessons from Vertex AI',
    category: 'GenAI',
    tags: ['Prompt Engineering', 'Vertex AI', 'Gemini', 'LLM', 'Google Cloud'],
    date: 'Oct 2024',
    readTime: '5 min read',
    featured: false,
    excerpt:
      'After completing Google Cloud\'s GenAI Academy, here\'s what I wish I knew about multi-turn prompts, chain-of-thought, and structuring outputs for downstream code. No theory, just working patterns.',
    content: [
      { type: 'highlight', text: 'Most prompt engineering advice is theoretical. This is what I found to actually work after hands-on experimentation across Gemini Pro, Gemini Flash, and Vertex AI APIs.' },
      { type: 'h2', text: 'Mistake 1: Vague Role Instructions' },
      { type: 'p', text: 'Saying "You are a helpful assistant" accomplishes nothing. The model already knows that. What it needs is domain expertise framing + output format expectations.' },
      { type: 'list', items: [
        '❌ "You are a helpful assistant. Answer my question about Python."',
        '✅ "You are a senior Python engineer specialising in FastAPI and async programming. Answer in concise technical language. Include code examples. Format code in fenced blocks with language tags."',
      ]},
      { type: 'h2', text: 'Mistake 2: One-Shot When You Need Few-Shot' },
      { type: 'p', text: 'For structured extraction tasks (JSON output, table parsing, classification), 3 good examples in the prompt outperform elaborate instructions almost every time. The model learns the pattern implicitly.' },
      { type: 'code', lang: 'python', text: `prompt = """Extract structured data from resume text. Return JSON only.

Example 1:
Input: "Saurabh Salve | Python, FastAPI | IBM 2024"
Output: {"name": "Saurabh Salve", "skills": ["Python", "FastAPI"], "company": "IBM"}

Example 2:
Input: "Alice Chen | React, Node.js | Google 2023"
Output: {"name": "Alice Chen", "skills": ["React", "Node.js"], "company": "Google"}

Now extract from:
{resume_text}"""` },
      { type: 'h2', text: 'Chain-of-Thought: When and How' },
      { type: 'p', text: 'CoT ("Think step by step") helps for reasoning tasks. But naively appending it to every prompt wastes tokens on simple tasks. The rule I follow: use CoT when the task requires more than 2 logical steps. Skip it for pure extraction or classification.' },
      { type: 'p', text: 'For Vertex AI (Gemini Pro), structured CoT with explicit step labels outperformed unstructured "think step by step":' },
      { type: 'code', lang: 'python', text: `cot_prompt = """Analyse this code for bugs. Use this structure:
STEP 1 - Understand the code's intent
STEP 2 - Check for common Python pitfalls
STEP 3 - Verify edge cases (None, empty, overflow)
STEP 4 - Provide final verdict and fix

Code:
{code}"""` },
      { type: 'h2', text: 'Structured Outputs for Downstream Code' },
      { type: 'p', text: 'If you\'re using LLM output in code, always enforce JSON schema. Parsing free-text LLM output is a maintenance nightmare. Vertex AI\'s `response_schema` parameter (or OpenAI\'s `response_format`) is the right abstraction.' },
      { type: 'code', lang: 'python', text: `from google.generativeai import GenerativeModel
import typing_extensions as typing

class BlogPost(typing.TypedDict):
    title: str
    tags: list[str]
    summary: str
    word_count: int

model = GenerativeModel("gemini-1.5-flash")
result = model.generate_content(
    prompt,
    generation_config={"response_mime_type": "application/json",
                       "response_schema": BlogPost}
)` },
      { type: 'h2', text: 'Multi-Turn Conversation: Keep Context Lean' },
      { type: 'p', text: 'In multi-turn prompts, every previous message is re-sent as context. With long conversations, you hit context limits and costs explode. My approach: after turn 5, summarise the conversation history into a single "Context so far" block and drop individual turns.' },
      { type: 'tip', text: 'The single most impactful prompt improvement: add "Do not hallucinate. If you don\'t know, say UNKNOWN." It reduces confident wrong answers by ~40% on factual queries.' },
    ],
  },

  /* ── POST 05 ───────────────────────────────────────────────────────── */
  {
    slug: 'aws-lambda-etl-10k-events',
    title: 'AWS Lambda for ETL: Processing 10K Events/Day Serverlessly',
    category: 'Cloud / MLOps',
    tags: ['AWS Lambda', 'ETL', 'Docker', 'CI/CD', 'Serverless'],
    date: 'Aug 2023',
    readTime: '7 min read',
    featured: false,
    excerpt:
      'During my AWS internship I built a pipeline that processed 10K+ daily events with Lambda + CodePipeline. Here\'s the architecture, the pain points with cold starts, and what I\'d do differently.',
    content: [
      { type: 'highlight', text: 'Serverless sounds magical until you hit cold starts, timeout limits, and deployment package size restrictions. Here\'s the real-world picture.' },
      { type: 'h2', text: 'Architecture Overview' },
      { type: 'p', text: 'The pipeline\'s job: ingest raw event data (API calls, clickstream, system logs) from S3, transform it (clean, enrich, aggregate), and load into a data warehouse (Redshift) for BI reporting. 10K+ events/day across 6 event types.' },
      { type: 'list', items: [
        'Source: S3 event notifications trigger Lambda on new file upload',
        'Transform Lambda: pandas + custom business rules (Python 3.11)',
        'Dead letter queue: SQS DLQ for failed transformations',
        'Load: boto3 Redshift Data API (no VPC complexity)',
        'Orchestration: AWS CodePipeline for code deployments',
        'Monitoring: CloudWatch metrics + custom Slack alerting Lambda',
      ]},
      { type: 'h2', text: 'Lambda Configuration That Matters' },
      { type: 'p', text: 'Lambda\'s default 128MB memory is a trap for pandas workloads. Memory also controls CPU allocation (proportionally). I settled on 1024MB — 4× the default, but pandas transforms ran 6× faster.' },
      { type: 'code', lang: 'python', text: `# lambda_function.py
import json, boto3, pandas as pd
from io import StringIO

s3 = boto3.client('s3')
redshift_data = boto3.client('redshift-data')

def lambda_handler(event, context):
    # Parse S3 trigger
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    # Read raw data
    obj = s3.get_object(Bucket=bucket, Key=key)
    df = pd.read_csv(StringIO(obj['Body'].read().decode('utf-8')))

    # Transform
    df = transform(df)

    # Load to Redshift
    redshift_data.execute_statement(
        ClusterIdentifier=os.environ['CLUSTER_ID'],
        Database='analytics',
        Sql=build_copy_sql(df),
        SecretArn=os.environ['SECRET_ARN'],
    )
    return {'statusCode': 200, 'processed': len(df)}` },
      { type: 'h2', text: 'Cold Start Mitigation' },
      { type: 'p', text: 'Pandas cold start: ~3.2 seconds for a 1024MB Lambda with pandas + numpy. Unacceptable for synchronous APIs, acceptable for async ETL. I used two strategies to reduce impact:' },
      { type: 'list', items: [
        'Provisioned concurrency for the first Lambda in the chain (always warm, costs ~$12/month)',
        'EventBridge "ping" rule: fires a keep-alive invocation every 5 minutes for non-provisioned Lambdas during business hours',
        'Layered dependencies: pandas/numpy in a separate Lambda Layer, reducing deployment package size from 45MB to 8MB (faster cold start)',
      ]},
      { type: 'h2', text: 'What I\'d Do Differently' },
      { type: 'list', items: [
        'Replace pandas with Polars for transformations — 3× faster, better memory usage, same API familiarity',
        'Use AWS Glue for heavy ETL (>100K events) — Lambda\'s 15-minute timeout is a hard ceiling',
        'Add idempotency keys — Lambda retries on failure, and duplicate processing caused duplicate Redshift rows we had to deduplicate downstream',
        'S3 Select to filter data before download — reading 500MB CSV to transform 50MB of relevant rows is wasteful',
      ]},
      { type: 'tip', text: 'Lambda memory is the most impactful config knob for data workloads. Always benchmark at 128MB, 512MB, and 1024MB. The cost increase from 128→1024 is offset by 3-8× faster execution (you pay for GB-seconds, not just memory).' },
    ],
  },

  /* ── POST 06 ───────────────────────────────────────────────────────── */
  {
    slug: 'rag-explained-open-book-test',
    title: 'RAG Applications — Explained Like an Open Book Test',
    category: 'GenAI',
    tags: ['RAG', 'LLM', 'Vector Database', 'Semantic Search', 'GenAI'],
    date: 'Jun 2026',
    readTime: '3 min read',
    featured: false,
    excerpt:
      'RAG (Retrieval Augmented Generation) is like an open book exam — you give your AI a knowledge base to refer from. Here\'s how it works, from ingestion to retrieval, with real-world patterns.',
    content: [
      { type: 'image', src: '/rag/image1rag.png', alt: 'RAG Hero Banner', caption: 'Give your AI an open book — that\'s RAG.' },
      { type: 'p', text: 'You know that feeling during your school exams when you had an open book test? Like, the book is right there in front of you. Whenever a question appears, you just flip to the right page and write the answer.' },
      { type: 'p', text: 'And we all know, the answer you write when you have the book in front of you is way more accurate than what you\'d write from memory alone. Because the book has the right information. The correct answer. Exactly what you need.' },
      { type: 'p', text: 'That is RAG. That\'s it. That\'s the simplest way I can explain it to you.' },
      { type: 'p', text: 'RAG stands for Retrieval Augmented Generation. And it\'s literally just that: giving your AI model a "book" to refer from, so its answers are more accurate, more relevant, and more grounded in real information.' },
      { type: 'p', text: 'Now let\'s talk about how it actually works under the hood.' },
      { type: 'image', src: '/rag/image2rag.png', alt: 'RAG Overview Diagram', caption: 'Two phases: Ingestion (building the book) and Retrieval (using it).' },
      { type: 'h2', text: 'The Architecture of RAG' },
      { type: 'p', text: 'RAG is divided into two phases.' },
      { type: 'p', text: 'Phase 1 is the Ingestion Pipeline and Phase 2 is the Retrieval Pipeline.' },
      { type: 'p', text: 'Let\'s go one by one.' },
      { type: 'h2', text: 'Phase 1: Ingestion Pipeline' },
      { type: 'p', text: 'Think of this as building the book that your AI will refer to later.' },
      { type: 'image', src: '/rag/image3rag.png', alt: 'Ingestion Pipeline Visual', caption: 'Four steps: Data Sourcing → Chunking → Embeddings → Vector Database.' },
      { type: 'h3', text: 'Step 1: Data Sourcing' },
      { type: 'p', text: 'This is where you collect your data. Could be PDFs, websites, documents, anything. You gather whatever information you want your AI to know about.' },
      { type: 'h3', text: 'Step 2: Chunking' },
      { type: 'p', text: 'Now you take all that data and divide it into smaller pieces. We call these chunks. Why? Because you can\'t just throw a 500 page document at a model. You break it down into manageable, meaningful pieces.' },
      { type: 'h3', text: 'Step 3: Embeddings' },
      { type: 'p', text: 'Okay, this one is important to understand. Models don\'t understand text the way we do. They understand vectors, basically numbers and mathematical representations of meaning. So we convert our chunks into vectors, and this conversion is called creating embeddings. You have APIs for this from OpenAI, Hugging Face, and many others.' },
      { type: 'p', text: 'And here\'s the cool part. Once you have these vectors, you can do something called cosine similarity. Which is basically a mathematical way of checking how close two pieces of text are in meaning. That\'s what powers semantic search.' },
      { type: 'image', src: '/rag/image4rag.png', alt: 'Embeddings and Vectors Visual', caption: 'Word embeddings as points in space — similar words are close together.' },
      { type: 'h3', text: 'Step 4: Vector Database' },
      { type: 'p', text: 'All those embeddings? We store them in a Vector Database. And that vector database becomes our Knowledge Base. The book. The one your AI will refer to.' },
      { type: 'p', text: 'Ingestion pipeline done.' },
      { type: 'h2', text: 'Phase 2: Retrieval Pipeline' },
      { type: 'image', src: '/rag/image5rag.png', alt: 'Retrieval Pipeline Visual', caption: 'User query → Embeddings → Vector search → Retrieve chunks → Generate response.' },
      { type: 'p', text: 'Now a user comes in and types a query. Let\'s say something like, "What is the temperature today in Pune?"' },
      { type: 'p', text: 'Here\'s what happens next.' },
      { type: 'p', text: 'That query gets converted into embeddings. Same process as before.' },
      { type: 'p', text: 'Then a semantic search happens and the system looks inside our vector database and finds the most relevant chunks that match what the user is asking.' },
      { type: 'p', text: 'Those relevant chunks get pulled out. That\'s the Retrieval part. The R in RAG. The data coming out of our knowledge base that actually matches the user\'s question.' },
      { type: 'p', text: 'That retrieved data is now saved as context.' },
      { type: 'p', text: 'Now here\'s where it gets interesting.' },
      { type: 'p', text: 'We also set a prompt for our LLM. Why? Because we need to tell the model what its job is.' },
      { type: 'p', text: 'Like, imagine you\'re building a RAG chatbot for your café. You don\'t want that chatbot answering "What is the capital of France?" That\'s useless for a café. You give the LLM a prompt saying hey, stay focused on café related stuff only. Menu, timings, orders. That\'s it.' },
      { type: 'image', src: '/rag/image6rag.png', alt: 'Café Chatbot Analogy', caption: 'A friendly café assistant chatbot, focused on café-related questions.' },
      { type: 'p', text: 'So now you have two things. The context from retrieval, and the prompt which is your instructions to the LLM.' },
      { type: 'p', text: 'You combine them together. And that combination is called Augmentation. The A in RAG.' },
      { type: 'p', text: 'Now it makes sense why that word is there, right?' },
      { type: 'p', text: 'Finally, you give this combined context and prompt to the LLM, and it generates the final answer for the user.' },
      { type: 'p', text: 'That\'s the Generation. The G in RAG.' },
      { type: 'p', text: 'Retrieval. Augmentation. Generation. RAG.' },
      { type: 'image', src: '/rag/image7rag.png', alt: 'RAG Acronym Breakdown', caption: 'R for Retrieval, A for Augmentation, G for Generation.' },
      { type: 'h2', text: 'RAG Patterns' },
      { type: 'image', src: '/rag/image8rag.png', alt: 'RAG Patterns Overview', caption: 'Four common RAG patterns: Naive, Memory, Graph, and Agentic.' },
      { type: 'p', text: 'Now RAG isn\'t just one thing. There are several patterns of RAG depending on what you\'re building and how complex your use case is.' },
      { type: 'list', items: [
        'Naive RAG: The basic version. What we just explained above. Simple ingestion, simple retrieval, done.',
        'RAG with Memory: Here you give your RAG system memory. So it remembers previous conversations and context. Makes the responses feel much more human and continuous.',
        'Graph RAG: Instead of just storing chunks, you store relationships between data using a knowledge graph. Great for complex, interconnected data where context between topics matters.',
        'Agentic RAG: This one\'s powerful. Here the RAG system can take actions, make decisions, call tools, and plan steps on its own. It\'s not just retrieving and answering, it\'s actually acting like an agent.',
      ]},
      { type: 'p', text: 'And honestly? This list keeps growing. The field is evolving fast and new RAG patterns keep coming up depending on the problems people are solving.' },
      { type: 'image', src: '/rag/image9rag.png', alt: 'Closing Visual', caption: 'A student confidently solving an exam with an open book — that\'s RAG.' },
      { type: 'h2', text: 'Wrapping Up' },
      { type: 'p', text: 'RAG is one of those concepts that sounds very technical at first but once you get it, it just clicks. It\'s an open book test. Your AI has the book. It finds the right page. It writes the answer.' },
      { type: 'p', text: 'Simple as that.' },
    ],
  },

  /* ── POST 07 ───────────────────────────────────────────────────────── */
  {
    slug: 'hackathon-postmortem-genai-exchange',
    title: 'Hackathon Post-Mortem: GenAI Exchange Top 5%',
    category: 'Project Log',
    tags: ['Hackathon', 'GenAI', 'Multi-Agent', 'Google Cloud', 'Vertex AI'],
    date: 'Sep 2024',
    readTime: '9 min read',
    featured: false,
    excerpt:
      'What we built, how we planned it, the 2 AM bug that almost killed us, and what made it land in the top 5%. An honest breakdown of the entire GenAI Exchange Hackathon journey.',
    content: [
      { type: 'highlight', text: 'Top 5% nationwide out of hundreds of teams. This is the honest account — the wins, the panic, and the things that almost didn\'t work.' },
      { type: 'h2', text: 'The Idea' },
      { type: 'p', text: 'GenAI Exchange (Google/Hack2Skill) prompt: "Build something that uses Generative AI to solve a real problem." Vague, intentionally. After 30 minutes of brainstorming, we landed on: AI-assisted artisan marketplace.' },
      { type: 'p', text: 'The problem: India has millions of traditional artisans. Their craft doesn\'t reach global buyers because they have no digital presence, no product descriptions, no marketing. Our solution: take a photo of a craft → AI generates product story, pricing estimate, cultural context, and social media content. Artisans with zero tech literacy could participate.' },
      { type: 'h2', text: 'Day 1: Architecture Planning (8 Hours)' },
      { type: 'p', text: 'We spent the first 8 hours not writing a line of code. Architecture decisions made in hour 1 that paid off in hour 36:' },
      { type: 'list', items: [
        'Vertex AI Gemini Pro Vision for image understanding (runs on Google Cloud — fits the hackathon theme)',
        'FastAPI backend (team knew it, fast to prototype)',
        'React frontend with Tailwind (simplest to deploy to Netlify)',
        'Firebase for auth + Firestore for submissions (zero-config backend)',
        'Cloud Run for the API (auto-scales, managed HTTPS)',
      ]},
      { type: 'h2', text: 'Day 2: The Build Sprint (18 Hours)' },
      { type: 'p', text: 'Each team member owned a vertical: I owned the Gemini Vision pipeline + multi-agent content generation. The pipeline: image upload → Gemini Vision analysis → parallel agents for story, pricing, and social content → assembled response.' },
      { type: 'code', lang: 'python', text: `async def generate_artisan_content(image_bytes: bytes, craft_type: str):
    # Step 1: Visual analysis
    analysis = await gemini_vision_analyze(image_bytes)

    # Step 2: Parallel content generation
    story, pricing, social = await asyncio.gather(
        generate_cultural_story(analysis, craft_type),
        estimate_pricing(analysis, craft_type),
        generate_social_content(analysis),
    )
    return {"story": story, "pricing": pricing, "social": social}` },
      { type: 'h2', text: 'The 2 AM Bug' },
      { type: 'p', text: 'At 2 AM, 10 hours before the submission deadline, the demo broke. The Gemini Vision API was returning truncated responses on large images (>2MB). Our UI was trying to parse incomplete JSON and silently failing — showing empty product cards.' },
      { type: 'p', text: 'Root cause: Vertex AI had a 10-second timeout for synchronous responses. Large image analysis was consistently hitting 11-12 seconds. The fix: stream the response and parse incrementally. Time to fix: 45 minutes. Time we lost to debugging the wrong thing first: 2 hours.' },
      { type: 'h2', text: 'What Made It Land in the Top 5%' },
      { type: 'p', text: 'Judges\' feedback (paraphrased): "Real problem, real solution, working demo." Many teams had compelling ideas but incomplete demos. We prioritised a working core over ambitious incomplete features.' },
      { type: 'list', items: [
        'Working end-to-end demo with real artisan images (not synthetic)',
        'Cultural context in the AI stories — judges specifically called this out',
        'Live deployment to Cloud Run (accessible URL, not localhost screenshots)',
        'Clear problem-solution framing in the 3-minute pitch',
      ]},
      { type: 'h2', text: 'Key Takeaways' },
      { type: 'list', items: [
        'Ship a working core before adding features. A demo that works at 70% scope beats a broken demo at 100% scope every time.',
        'Error handling before the final hour. We added it at midnight. Should have been day 1.',
        'Practice the demo under realistic conditions (slow internet, non-dev images). We discovered 2 edge cases during dry-run that would have crashed the live demo.',
        'The pitch matters as much as the code. Engineers underinvest in story. Judges are human.',
      ]},
    ],
  },
  {
    slug: 'linux-day-01-learning-basics',
    title: 'Day 01: Linux Basics — Kernels, Shells & Bootloaders',
    category: 'Learning',
    tags: ['Linux', 'Kernels', 'Shells', 'Bootloaders', 'Systems', 'Fundamentals'],
    date: 'Jun 2026',
    readTime: '5 min read',
    featured: false,
    excerpt: 'Starting my Linux learning journey. A quick primer on the core components: kernels manage hardware, shells interpret commands, and bootloaders start it all. Plus 9 essential Linux commands you need to know.',
    content: [
      { type: 'h2', text: 'What is Linux?' },
      { type: 'p', text: 'Linux traces back to 1991 when Linus Torvalds founded Unix. Today, 90% of applications new are running on Linux. In the earlier days, Unix was used as a commands library, and because commands required payment, so Linux developed as a free alternative. Think of it as a parent of Linux.' },
      { type: 'h2', text: 'Running Linux on Windows' },
      { type: 'list', items: [
        'WSL (Windows Subsystem for Linux) — requires laptop restart and enabling the Linux button for OS usage',
        'Virtual Machine — straightforward installation guide',
        'AWS, Azure, GCP running virtual machines',
        'Vagrant Inswaration',
      ]},
      { type: 'h2', text: 'Linux vs Windows' },
      { type: 'highlight', text: 'Linux: GPL (General Public License), Dev, Prog, yearly 2 updates, Windows: Commercial License, Movies, Games, Many updates' },
      { type: 'h2', text: 'The Core Components' },
      { type: 'h3', text: 'Kernels' },
      { type: 'p', text: 'The Linux kernel is the foundational core of the Linux operating system. It acts as the direct, low-level intermediary between your computer\'s hardware (CPU, memory, storage) and the software applications running on your system.' },
      { type: 'list', items: [
        'Hardware Management: Controls devices, including GPUs, network cards, and storage units, without forcing apps to know specific hardware details',
        'Memory Allocation: Manages system RAM and delegates memory space securely to active programs',
        'Process Scheduling: Decides which software gets CPU time and balances execution so multiple tasks run smoothly',
      ]},
      { type: 'h3', text: 'Shells' },
      { type: 'p', text: 'A shell in Linux is the command-line interpreter that acts as the outer layer surrounding the kernel. It serves as the user interface, taking the text commands you type and translating them into instructions the kernel can execute.' },
      { type: 'h3', text: 'Shell Types' },
      { type: 'list', items: [
        'Bash (Bourne Again Shell): The standard default shell for most Linux distributions',
        'Zsh (Z Shell): Highly customizable with advanced auto-completion, popular in modern setups and macOS',
        'Fish (Friendly Interactive Shell): Focuses on user-friendliness with out-of-the-box syntax highlighting and suggestions',
        'Sh (Bourne Shell): The older, foundational UNIX shell used widely for basic scripting compatibility',
      ]},
      { type: 'h3', text: 'Shell Core Functions' },
      { type: 'list', items: [
        'Command Execution: Interprets your typed inputs and launches the corresponding system programs',
        'Environment Management: Stores variables (like PATH) that define how your system and applications behave',
        'Scripting Automation: Executes files containing lists of commands to automate repetitive tasks',
      ]},
      { type: 'h3', text: 'Bootloader' },
      { type: 'p', text: 'A bootloader is the first piece of software that runs when you turn on a computer or smartphone. Its primary job is to initialize the hardware and load the operating system kernel into the computer\'s memory.' },
      { type: 'h3', text: 'Bootloader Responsibilities' },
      { type: 'list', items: [
        'Hardware Initialization: Tests and sets up crucial components like the CPU, RAM, and storage drives immediately after power-on',
        'Kernel Loading: Locates the Linux kernel on the storage drive, loads it into the system RAM, and hands over total control to it',
        'OS Selection: Provides a visual menu allowing you to choose between different operating systems or recovery modes if you have a dual-boot setup',
      ]},
      { type: 'h3', text: 'Common Linux Bootloaders' },
      { type: 'list', items: [
        'GRUB (Grand Unified Bootloader): The standard, highly versatile bootloader used by almost all major desktop Linux distributions',
        'systemd-boot: A modern, lightweight text-based bootloader designed specifically for UEFI systems',
        'U-Boot: The industry standard bootloader used in embedded Linux devices, routers, and Android phones',
      ]},
      { type: 'h2', text: '9 Essential Linux Commands' },
      { type: 'list', items: [
        'pwd — Print working directory',
        'ls — List files',
        'cd — Change directory',
        'top — Show running processes',
        'free -h — Display memory usage',
        'df -h — Show disk space usage',
        'mkdir — Make directory',
        'touch — Create file',
        'man — Display command manual',
      ]},
      { type: 'tip', text: 'Start small with these 9 commands. They\'ll handle 80% of your daily Linux tasks. Practice them on a VM first before jumping into production systems.' },
      { type: 'h2', text: 'Test Your Knowledge' },
      { type: 'quiz', title: 'Linux Basics Quiz', description: 'Test your understanding of Linux fundamentals. Click on the correct answer for each question.', questions: [
        {
          text: 'What is the primary role of the Linux kernel?',
          options: [
            'To provide a graphical user interface',
            'To act as the intermediary between hardware and software applications',
            'To manage user account credentials only',
            'To compile source code into executable binaries'
          ],
          correct: 1,
          explanation: 'The kernel is the core of the OS that manages hardware resources, memory allocation, and process scheduling.'
        },
        {
          text: 'Which of the following is NOT a responsibility of the kernel?',
          options: [
            'Memory Allocation',
            'Process Scheduling',
            'Rendering graphical interfaces',
            'Hardware Management'
          ],
          correct: 2,
          explanation: 'Rendering graphical interfaces is handled by applications and window managers, not the kernel itself.'
        },
        {
          text: 'What does a shell do in Linux?',
          options: [
            'It directly controls the hardware',
            'It compiles programs into machine code',
            'It acts as a command-line interpreter between the user and kernel',
            'It manages all network traffic'
          ],
          correct: 2,
          explanation: 'The shell takes text commands you type and translates them into instructions the kernel can execute.'
        },
        {
          text: 'Which shell is the standard default for most Linux distributions?',
          options: [
            'Zsh (Z Shell)',
            'Fish (Friendly Interactive Shell)',
            'Bash (Bourne Again Shell)',
            'Ksh (Korn Shell)'
          ],
          correct: 2,
          explanation: 'Bash is the most widely used and default shell in most Linux distributions.'
        },
        {
          text: 'What is the primary job of a bootloader?',
          options: [
            'To update the operating system',
            'To initialize hardware and load the kernel into memory',
            'To manage file permissions',
            'To optimize system performance'
          ],
          correct: 1,
          explanation: 'The bootloader is the first software to run and is responsible for loading the OS kernel into RAM.'
        }
      ]}
    ],
  },
]

export function getPost(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null
}
