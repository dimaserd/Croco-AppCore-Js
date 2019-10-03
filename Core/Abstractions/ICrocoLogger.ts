interface ICrocoLogger {
    LogException(exceptionText: string, exceptionDescription: string, link: string): void;
    LogAction(message: string, description: string, groupName: string): void;
}
