using System.Security.Cryptography;
using System.Text;

namespace Usc
{
    public static class Crypto
    {
        private static string GetSha256(string input)
        {
            using var sha256 = SHA256.Create();
            byte[] output = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
            
            var sb = new StringBuilder();
            foreach (var j in output)
                sb.Append(j.ToString("x2"));
            return sb.ToString();
        }

        private static string GetMd5(string input)
        {
            using var md5 = MD5.Create();
            byte[] output = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
            
            var sb = new StringBuilder();
            foreach (var j in output)
                sb.Append(j.ToString("x2"));
            return sb.ToString();
        }

        public static string Hashing(string input)
        {
            var watch = System.Diagnostics.Stopwatch.StartNew();
            string hasher = GetSha256(GetMd5(input));
            for (int i = 0; i < 20000; i++) {
                hasher = GetSha256(GetMd5(hasher));
                Console.WriteLine(hasher);
            }
            watch.Stop();
            var elapsedMs = watch.ElapsedMilliseconds;
            Console.WriteLine(elapsedMs);
            return hasher;
        }
    }

    public static class Usc
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Before: {0} \nAfter: {1}", "Artemka", Crypto.Hashing("Artemka"));
        }
    }
}
