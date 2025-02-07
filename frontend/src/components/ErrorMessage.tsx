interface ErrorMessageProps {
    message: string;
    onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
    <div className="container">
        <div className="error-container">
            <p className="error-message">{message}</p>
            <button className="retry-button" onClick={onRetry}>
                Réessayer
            </button>
        </div>
    </div>
);

export default ErrorMessage;