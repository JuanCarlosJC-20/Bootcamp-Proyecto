using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utilities.Exceptions
{
    // Solución: Heredar de Exception para que los constructores funcionen correctamente.
    public class ControllerException : Exception
    {
        public ControllerException(string message) : base(message)
        {
        }

        /// <summary>
        /// Inicializa una nueva instancia de <see cref="ControllerException"/> con un mensaje de error y una excepción interna.
        /// </summary>
        /// <param name="message">El mensaje que describe el error.</param>
        /// <param name="innerException">La excepción que es la causa del error actual.</param>
        public ControllerException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}

