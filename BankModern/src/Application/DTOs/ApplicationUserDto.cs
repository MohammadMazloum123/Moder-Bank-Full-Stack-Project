namespace BankModern.src.Application.DTOs
{
    public class ApplicationUserDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } // Admin or Normal User
        //public bool IsActive { get; set; } // Add this property to reflect the activation status
    }
}
