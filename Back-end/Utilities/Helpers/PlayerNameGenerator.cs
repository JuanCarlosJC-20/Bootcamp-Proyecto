namespace Utilities.Helpers
{
    public static class PlayerNameGenerator
    {
        private static readonly string[] MonthNames = {
            "January", "February", "March", "April", "May", "Jun",
            "July", "August", "September", "October", "November", "December"
        };

        public static List<string> GenerateRandomNames(int count)
        {
            var names = new List<string>();
            var usedCombinations = new HashSet<string>(); //HasSet no permite duplicados 
            var random = new Random();

            while (names.Count < count)
            {
                var randomMonth = MonthNames[random.Next(MonthNames.Length)];
                
                var randomYear = random.Next(2000, 3001);
                
                var combination = $"{randomMonth}{randomYear}";
                
                if (!usedCombinations.Contains(combination))
                {
                    usedCombinations.Add(combination);
                    names.Add(combination);
                }
            }

            return names;
        }
    }
}
