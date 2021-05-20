namespace Reactivities.Application.Core
{
    using MediatR;

    public enum ExecutionResultType
    {
        Success, Invalid, Missing, Other
    } 
    
    public class ExecutionResult<TValue>
    {
        public TValue Value { get; init; }

        public ExecutionResultType Type { get; init; } = ExecutionResultType.Success;
        
        public object Extensions { get; init; }
    }

    public static class ExecutionResult
    {
        public static ExecutionResult<Unit> SuccessUnit() => new()
        {
            Value = Unit.Value
        };
        
        public static ExecutionResult<T> Success<T>(T result) =>
            new()
            {
                Value = result
            };

        public static ExecutionResult<T> Missing<T>(object extensions = null) => new()
        {
            Extensions = extensions,
            Type = ExecutionResultType.Missing
        };
        
        public static ExecutionResult<T> Invalid<T>(object extensions = null) => new()
        {
            Extensions = extensions,
            Type = ExecutionResultType.Invalid
        };
    }
    
    
}