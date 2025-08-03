using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utilities.Exceptions
{
    public  class DuplicateCardException : Exception
    {
        public List<string> Errores { get; }

        public DuplicateCardException(List<string> errores)
            : base("Se encontraron valores duplicados.")
        {
            Errores = errores;
        }

    }
}
