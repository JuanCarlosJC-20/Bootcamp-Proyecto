using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utilities.Exceptions
{
    public class ControllerException : Exception
    {
        public ControllerException(string message) : base(message)
        {
        }
        public ControllerException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}

