import type { QuizQuestion } from 'model/quiz-question.ts'
import {
    Answer,
    useQuestionFeedbackState,
    useQuestionTakeState,
    QuestionCorrectness,
    QuestionExplanation,
} from 'pages/question-take'

interface QuestionFormProps {
    readonly question: QuizQuestion
}

export const NextQuestionButton = () => (
    <div>
        <button type="button" id="next-question">
            Next Question
        </button>
    </div>
)

export const QuestionForm = (props: QuestionFormProps) => {
    const state = useQuestionTakeState(props.question)
    const feedback = useQuestionFeedbackState(state, props.question)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (state.selectedAnswerIdxs.length > 0) state.submit()
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{props.question.question}</h1>
            <ul>
                {props.question.answers.map((answer, idx) => (
                    <Answer
                        isMultipleChoice={state.isMultipleChoice}
                        idx={idx}
                        answer={answer}
                        isCorrect={feedback.isAnswerCorrect(idx)}
                        explanation={props.question.explanations ? props.question.explanations[idx] : 'not defined'}
                        showFeedback={state.submitted && feedback.showFeedback(idx)}
                        onAnswerChange={state.onSelectedAnswerChange}
                    />
                ))}
            </ul>
            {!state.submitted && <input type="submit" value="Submit" />}
            {state.submitted && <QuestionCorrectness isCorrect={feedback.isQuestionCorrect} />}
            {state.submitted && <QuestionExplanation text={props.question.questionExplanation} />}
            {state.submitted && <NextQuestionButton />}
        </form>
    )
}
