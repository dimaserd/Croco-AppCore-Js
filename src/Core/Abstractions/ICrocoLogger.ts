export interface ICrocoLogger {
    /**
     * Залоггировать исключение
     * @param exceptionText
     * @param exceptionDescription
     * @param link
     */
    LogException(exceptionText: string, exceptionDescription: string, link: string): void;

    /**
     * Залоггировать действие
     * @param message
     * @param description
     * @param eventId
     * @param parametersJson
     */
    LogAction(message: string, description: string, eventId: string, parametersJson: string): void;
}