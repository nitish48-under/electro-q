const questions = {
  analog: [
    {
      question: "Which semiconductor device is primarily used for rectification?",
      options: ["Transistor", "Diode", "MOSFET", "Op-amp"],
      answer: 1,
      explanation: "A diode allows current to flow predominantly in one direction, making it suitable for rectification."
    },
    {
      question: "What is the main function of a transistor in an amplifier?",
      options: ["Store charge", "Amplify signals", "Convert AC to DC", "Generate clock pulses"],
      answer: 1,
      explanation: "A transistor can provide voltage or current gain and is widely used for signal amplification."
    },
    {
      question: "Which configuration of a BJT generally provides high voltage gain?",
      options: ["Common emitter", "Common collector", "Common base only", "Open collector"],
      answer: 0,
      explanation: "The common-emitter configuration is widely used for voltage amplification."
    },
    {
      question: "An ideal diode in forward bias behaves approximately like:",
      options: ["An open circuit", "A short circuit", "A capacitor", "An inductor"],
      answer: 1,
      explanation: "An ideal forward-biased diode has zero voltage drop and behaves like a short circuit."
    },
    {
      question: "What does a capacitor primarily store?",
      options: ["Magnetic energy", "Electrical charge", "Mechanical energy", "Heat"],
      answer: 1,
      explanation: "A capacitor stores energy in its electric field in the form of separated electrical charge."
    },
    {
      question: "Which device is commonly used for voltage regulation?",
      options: ["Zener diode", "LED", "Photodiode", "Varactor diode"],
      answer: 0,
      explanation: "A Zener diode operated in its breakdown region can maintain an approximately constant voltage."
    },
    {
      question: "What is the main purpose of a rectifier circuit?",
      options: ["Convert DC to AC", "Convert AC to DC", "Increase frequency", "Store digital data"],
      answer: 1,
      explanation: "A rectifier converts an alternating voltage into a unidirectional or DC voltage."
    },
    {
      question: "An operational amplifier ideally has:",
      options: ["Very low input impedance", "Very high input impedance", "Zero voltage gain", "Very high output impedance"],
      answer: 1,
      explanation: "An ideal op-amp has infinite input impedance, so it draws ideally no input current."
    }
  ],

  digital: [
    {
      question: "Which logic gate produces HIGH output only when all inputs are HIGH?",
      options: ["OR", "AND", "XOR", "NOR"],
      answer: 1,
      explanation: "An AND gate produces HIGH only when every input is HIGH."
    },
    {
      question: "What is the binary representation of decimal 10?",
      options: ["1001", "1010", "1100", "1110"],
      answer: 1,
      explanation: "Decimal 10 is represented as 1010 in binary."
    },
    {
      question: "Which gate is known as an universal gate?",
      options: ["AND", "OR", "NAND", "XOR"],
      answer: 2,
      explanation: "NAND is a universal gate because any basic logic function can be constructed using NAND gates."
    },
    {
      question: "A flip-flop is primarily used to:",
      options: ["Store one bit", "Amplify voltage", "Convert AC to DC", "Generate analog signals"],
      answer: 0,
      explanation: "A flip-flop is a bistable circuit capable of storing one binary bit."
    },
    {
      question: "Which number system uses only 0 and 1?",
      options: ["Decimal", "Octal", "Binary", "Hexadecimal"],
      answer: 2,
      explanation: "The binary number system has base 2 and uses only 0 and 1."
    },
    {
      question: "What is the output of an XOR gate when both inputs are 1?",
      options: ["0", "1", "Depends on frequency", "Undefined"],
      answer: 0,
      explanation: "XOR produces HIGH when its inputs are different. With inputs 1 and 1, the output is 0."
    },
    {
      question: "Which circuit converts binary information into one of several output lines?",
      options: ["Demultiplexer", "Decoder", "Adder", "Comparator"],
      answer: 1,
      explanation: "A decoder converts an n-bit binary input into one of up to 2ⁿ output lines."
    },
    {
      question: "Which circuit adds two binary numbers?",
      options: ["Counter", "Multiplexer", "Adder", "Encoder"],
      answer: 2,
      explanation: "An adder performs binary addition."
    }
  ],

  communication: [
    {
      question: "What does AM stand for in communication systems?",
      options: ["Amplitude Modulation", "Analog Multiplication", "Automatic Modulation", "Amplitude Multiplication"],
      answer: 0,
      explanation: "AM stands for Amplitude Modulation, where the carrier amplitude varies according to the message signal."
    },
    {
      question: "In frequency modulation, which property of the carrier changes?",
      options: ["Amplitude", "Frequency", "Phase only", "Power supply"],
      answer: 1,
      explanation: "FM varies the instantaneous frequency of the carrier according to the message signal."
    },
    {
      question: "What is the main purpose of modulation?",
      options: ["Reduce all noise to zero", "Enable efficient transmission of information", "Eliminate antennas", "Remove the carrier"],
      answer: 1,
      explanation: "Modulation makes transmission practical by shifting information onto a suitable carrier frequency."
    },
    {
      question: "Which modulation technique varies the carrier phase?",
      options: ["AM", "FM", "PM", "ASK only"],
      answer: 2,
      explanation: "Phase modulation changes the phase of the carrier according to the message signal."
    },
    {
      question: "What does SNR represent?",
      options: ["Signal-to-Noise Ratio", "Signal Network Response", "System Noise Resistance", "Sampling Network Rate"],
      answer: 0,
      explanation: "SNR compares the strength of the desired signal with the strength of background noise."
    },
    {
      question: "Which medium uses electromagnetic waves through free space?",
      options: ["Wireless communication", "Twisted-pair cable", "Coaxial cable only", "Fiber core only"],
      answer: 0,
      explanation: "Wireless communication uses electromagnetic waves propagating through free space."
    },
    {
      question: "What is the basic purpose of a receiver?",
      options: ["Generate only noise", "Recover information from a received signal", "Destroy the carrier", "Increase antenna size"],
      answer: 1,
      explanation: "A receiver processes the received signal and recovers the transmitted information."
    },
    {
      question: "Which technique converts a continuous-time signal into discrete samples?",
      options: ["Sampling", "Amplification", "Modulation", "Filtering only"],
      answer: 0,
      explanation: "Sampling converts a continuous-time signal into a sequence of values taken at discrete time instants."
    }
  ],

  embedded: [
    {
      question: "What is an embedded system?",
      options: [
        "A general-purpose desktop only",
        "A computer system designed for a specific function",
        "A database server",
        "A web browser"
      ],
      answer: 1,
      explanation: "An embedded system is designed to perform a dedicated function within a larger system."
    },
    {
      question: "Which component executes instructions in a microcontroller?",
      options: ["CPU", "Resistor", "Capacitor", "LED"],
      answer: 0,
      explanation: "The CPU or processor core executes program instructions."
    },
    {
      question: "What does GPIO stand for?",
      options: [
        "General Purpose Input/Output",
        "General Processing Internal Output",
        "Global Peripheral Input Operation",
        "General Program Interface Option"
      ],
      answer: 0,
      explanation: "GPIO stands for General Purpose Input/Output and provides configurable digital input and output pins."
    },
    {
      question: "Which protocol is commonly used for serial communication between embedded devices?",
      options: ["UART", "HTML", "CSS", "JPEG"],
      answer: 0,
      explanation: "UART is a widely used asynchronous serial communication interface."
    },
    {
      question: "What is the purpose of a timer in a microcontroller?",
      options: [
        "Measure or generate time-related events",
        "Store images permanently",
        "Replace the CPU",
        "Increase RAM capacity"
      ],
      answer: 0,
      explanation: "Timers can measure intervals, generate delays, and trigger periodic events."
    },
    {
      question: "Which memory is typically non-volatile?",
      options: ["RAM", "Cache", "Flash memory", "CPU register"],
      answer: 2,
      explanation: "Flash memory retains stored data even when power is removed."
    },
    {
      question: "What is an interrupt used for?",
      options: [
        "Notify the processor that an event needs attention",
        "Increase screen resolution",
        "Remove all program instructions",
        "Convert AC into DC"
      ],
      answer: 0,
      explanation: "An interrupt allows hardware or software events to request processor attention."
    },
    {
      question: "Which device is commonly used to sense physical conditions?",
      options: ["Sensor", "Compiler", "Router", "Register only"],
      answer: 0,
      explanation: "Sensors detect physical quantities such as temperature, light, pressure, or motion."
    }
  ],

  signals: [
    {
      question: "A signal that repeats itself after a fixed interval is called:",
      options: ["Periodic", "Random", "Transient", "Constant only"],
      answer: 0,
      explanation: "A periodic signal repeats its waveform after a fixed time period."
    },
    {
      question: "What is the SI unit of frequency?",
      options: ["Volt", "Hertz", "Ohm", "Watt"],
      answer: 1,
      explanation: "Frequency is measured in hertz (Hz), representing cycles per second."
    },
    {
      question: "What does a system's impulse response describe?",
      options: [
        "Its response to an impulse input",
        "Its maximum voltage only",
        "Its power consumption only",
        "Its physical size"
      ],
      answer: 0,
      explanation: "The impulse response is the output produced by a system when the input is an impulse."
    },
    {
      question: "Which transform is commonly used to analyze signals in the frequency domain?",
      options: ["Fourier transform", "Boolean transform", "Binary transform", "Logic transform"],
      answer: 0,
      explanation: "The Fourier transform represents a signal in terms of its frequency components."
    },
    {
      question: "A continuous-time signal is defined for:",
      options: ["Only integer values of time", "Every instant of time", "Only binary states", "Only positive frequencies"],
      answer: 1,
      explanation: "A continuous-time signal has a value at every instant within its time domain."
    },
    {
      question: "What is convolution commonly used to determine?",
      options: [
        "Output of an LTI system",
        "Binary code only",
        "CPU temperature only",
        "Resistance of a wire"
      ],
      answer: 0,
      explanation: "For an LTI system, convolution of the input with the impulse response gives the output."
    },
    {
      question: "What is the amplitude of a signal related to?",
      options: [
        "Its magnitude",
        "Its frequency only",
        "Its time period only",
        "Its phase only"
      ],
      answer: 0,
      explanation: "Amplitude represents the magnitude or strength of a signal."
    },
    {
      question: "The time period of a periodic signal is the reciprocal of its:",
      options: ["Amplitude", "Frequency", "Phase", "Power"],
      answer: 1,
      explanation: "For a periodic signal, T = 1/f, where T is the time period and f is frequency."
    }
  ],

  microprocessors: [
    {
      question: "Which unit performs arithmetic and logical operations in a processor?",
      options: ["ALU", "RAM", "Clock", "Bus"],
      answer: 0,
      explanation: "The Arithmetic Logic Unit performs arithmetic and logical operations."
    },
    {
      question: "What is the purpose of the program counter?",
      options: [
        "Hold the address of the next instruction",
        "Store permanent data",
        "Perform multiplication only",
        "Control the power supply"
      ],
      answer: 0,
      explanation: "The program counter keeps track of the address of the next instruction to be fetched."
    },
    {
      question: "Which register typically stores the result of arithmetic operations in many processor architectures?",
      options: ["Accumulator", "Program counter", "Stack pointer", "Instruction register"],
      answer: 0,
      explanation: "An accumulator is commonly used to hold intermediate and final arithmetic or logical results."
    },
    {
      question: "What does RAM stand for?",
      options: [
        "Random Access Memory",
        "Read Access Module",
        "Rapid Arithmetic Memory",
        "Register Address Memory"
      ],
      answer: 0,
      explanation: "RAM stands for Random Access Memory."
    },
    {
      question: "Which bus carries memory addresses?",
      options: ["Data bus", "Address bus", "Control bus", "Power bus"],
      answer: 1,
      explanation: "The address bus carries the address of the memory or I/O location being accessed."
    },
    {
      question: "What is the function of the instruction register?",
      options: [
        "Hold the current instruction",
        "Store the operating voltage",
        "Generate analog signals",
        "Measure temperature"
      ],
      answer: 0,
      explanation: "The instruction register temporarily holds the instruction currently being decoded or executed."
    },
    {
      question: "Which component synchronizes processor operations?",
      options: ["Clock", "RAM", "ALU only", "Speaker"],
      answer: 0,
      explanation: "The processor clock provides timing signals that synchronize processor operations."
    },
    {
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Central Program Utility",
        "Computer Peripheral Unit",
        "Control Processing Utility"
      ],
      answer: 0,
      explanation: "CPU stands for Central Processing Unit."
    }
  ]
}

export default questions