import { useState } from 'react'
import '../styles/ArticleQuiz.css'

export default function ArticleQuiz({ quiz }) {
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState({})

  const handleOptionClick = (questionId, optionIndex) => {
    const isCorrect = optionIndex === quiz.questions[questionId].correct
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }))
    setShowResults(prev => ({
      ...prev,
      [questionId]: isCorrect
    }))
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowResults({})
  }

  return (
    <div className="article-quiz">
      <div className="quiz-header">
        <h2 className="quiz-title">{quiz.title}</h2>
        <p className="quiz-subtitle">{quiz.description}</p>
      </div>

      <div className="quiz-questions">
        {quiz.questions.map((question, qIdx) => (
          <div key={qIdx} className="quiz-question-block">
            <div className="quiz-question-number">Question {qIdx + 1}</div>
            <h3 className="quiz-question-text">{question.text}</h3>

            <div className="quiz-options">
              {question.options.map((option, oIdx) => (
                <button
                  key={oIdx}
                  className={`quiz-option ${
                    answers[qIdx] === oIdx ? (showResults[qIdx] ? 'correct' : 'incorrect') : ''
                  } ${answers[qIdx] === oIdx ? 'answered' : ''}`}
                  onClick={() => handleOptionClick(qIdx, oIdx)}
                  disabled={answers[qIdx] !== undefined}
                >
                  <span className="option-letter">{String.fromCharCode(65 + oIdx)}</span>
                  <span className="option-text">{option}</span>
                  {answers[qIdx] === oIdx && showResults[qIdx] && (
                    <span className="option-icon">✓</span>
                  )}
                  {answers[qIdx] === oIdx && !showResults[qIdx] && (
                    <span className="option-icon">✗</span>
                  )}
                </button>
              ))}
            </div>

            {answers[qIdx] !== undefined && !showResults[qIdx] && (
              <div className="quiz-feedback incorrect-feedback">
                ❌ Incorrect! The correct answer is: <strong>{question.options[question.correct]}</strong>
              </div>
            )}

            {answers[qIdx] !== undefined && showResults[qIdx] && (
              <div className="quiz-feedback correct-feedback">
                ✅ Correct! {question.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {Object.keys(answers).length === quiz.questions.length && (
        <div className="quiz-complete">
          <div className="quiz-score">
            You scored {Object.values(showResults).filter(Boolean).length} out of {quiz.questions.length}
          </div>
          <button className="quiz-reset-btn" onClick={resetQuiz}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
