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
            var usedCombinations = new HashSet<string>();
            var random = new Random();

            while (names.Count < count)
            {
                // Seleccionar mes aleatorio
                var randomMonth = MonthNames[random.Next(MonthNames.Length)];
                
                // Generar año aleatorio entre 2000 y 3000
                var randomYear = random.Next(2000, 3001);
                
                // Crear la combinación
                var combination = $"{randomMonth}{randomYear}";
                
                // Verificar que no se repita
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
