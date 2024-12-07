namespace BankModern.src.Application.DTOs
{
    public class AuthResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public int StatusCode { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public ApplicationUserDto User { get; set; }
        public CheckingAccountDto CheckingAccount { get; set; }
        public DateTime TokenExpiration { get; set; }
    }
}
