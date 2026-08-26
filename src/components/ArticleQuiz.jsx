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

  const answeredCount = Object.keys(answers).length
  const correctCount = Object.values(showResults).filter(Boolean).length
  const totalQuestions = quiz.questions.length
  const progressPercent = (answeredCount / totalQuestions) * 100

  const getScoreMessage = () => {
    const percentage = (correctCount / totalQuestions) * 100
    if (percentage === 100) return '🌟 Perfect Score! Excellent work!'
    if (percentage >= 80) return '🎉 Great Job! You really know your stuff!'
    if (percentage >= 60) return '👍 Good Effort! Keep learning!'
    return '💪 Keep Practicing! You\'ll improve!'
  }

  return (
    <div className="article-quiz">
      <div className="quiz-header">
        <h2 className="quiz-title">{quiz.title}</h2>
        <p className="quiz-subtitle">{quiz.description}</p>

        {answeredCount > 0 && (
          <div className="quiz-progress-container">
            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="quiz-progress-text">
              {answeredCount} of {totalQuestions} answered
            </div>
          </div>
        )}
      </div>

      <div className="quiz-questions">
        {quiz.questions.map((question, qIdx) => (
          <div key={qIdx} className="quiz-question-block">
            <div className="quiz-question-header">
              <div className="quiz-question-number">Question {qIdx + 1} of {totalQuestions}</div>
              {answers[qIdx] !== undefined && (
                <div className={`quiz-question-status ${showResults[qIdx] ? 'correct' : 'incorrect'}`}>
                  {showResults[qIdx] ? '✓ Answered' : '✗ Incorrect'}
                </div>
              )}
            </div>

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
                <div className="feedback-icon">❌</div>
                <div className="feedback-content">
                  <div className="feedback-label">Incorrect</div>
                  <div className="feedback-text">The correct answer is: <strong>{question.options[question.correct]}</strong></div>
                </div>
              </div>
            )}

            {answers[qIdx] !== undefined && showResults[qIdx] && (
              <div className="quiz-feedback correct-feedback">
                <div className="feedback-icon">✅</div>
                <div className="feedback-content">
                  <div className="feedback-label">Correct!</div>
                  <div className="feedback-text">{question.explanation}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {answeredCount === totalQuestions && (
        <div className="quiz-complete">
          <div className="quiz-score-container">
            <div className="quiz-score-circle">
              <div className="quiz-score-number">{correctCount}/{totalQuestions}</div>
            </div>
            <div className="quiz-score-message">{getScoreMessage()}</div>
            <div className="quiz-score-percentage">{Math.round((correctCount / totalQuestions) * 100)}% Correct</div>
          </div>
          <button className="quiz-reset-btn" onClick={resetQuiz}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
