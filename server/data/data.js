const quizzes = [
  {
    "id": "analog",
    "subject": "Analog Electronics",
    "description": "Diodes, transistors, amplifiers and analog circuits.",
    "questions": [
      {
        "id": 1,
        "question": "Which semiconductor device is primarily used for rectification?",
        "options": [
          "Transistor",
          "Diode",
          "MOSFET",
          "Op-amp"
        ],
        "answer": "Diode",
        "explanation": "A diode allows current to flow predominantly in one direction, making it suitable for rectification."
      },
      {
        "id": 2,
        "question": "What is the main function of a transistor in an amplifier?",
        "options": [
          "Store charge",
          "Amplify signals",
          "Convert AC to DC",
          "Generate clock pulses"
        ],
        "answer": "Amplify signals",
        "explanation": "A transistor can provide voltage or current gain and is widely used for signal amplification."
      },
      {
        "id": 3,
        "question": "Which configuration of a BJT generally provides high voltage gain?",
        "options": [
          "Common emitter",
          "Common collector",
          "Common base only",
          "Open collector"
        ],
        "answer": "Common emitter",
        "explanation": "The common-emitter configuration is widely used for voltage amplification."
      },
      {
        "id": 4,
        "question": "An ideal diode in forward bias behaves approximately like:",
        "options": [
          "An open circuit",
          "A short circuit",
          "A capacitor",
          "An inductor"
        ],
        "answer": "A short circuit",
        "explanation": "An ideal forward-biased diode has zero voltage drop and behaves like a short circuit."
      },
      {
        "id": 5,
        "question": "What does a capacitor primarily store?",
        "options": [
          "Magnetic energy",
          "Electrical charge",
          "Mechanical energy",
          "Heat"
        ],
        "answer": "Electrical charge",
        "explanation": "A capacitor stores energy in its electric field in the form of separated electrical charge."
      },
      {
        "id": 6,
        "question": "Which device is commonly used for voltage regulation?",
        "options": [
          "Zener diode",
          "LED",
          "Photodiode",
          "Varactor diode"
        ],
        "answer": "Zener diode",
        "explanation": "A Zener diode operated in its breakdown region can maintain an approximately constant voltage."
      },
      {
        "id": 7,
        "question": "What is the main purpose of a rectifier circuit?",
        "options": [
          "Convert DC to AC",
          "Convert AC to DC",
          "Increase frequency",
          "Store digital data"
        ],
        "answer": "Convert AC to DC",
        "explanation": "A rectifier converts an alternating voltage into a unidirectional or DC voltage."
      },
      {
        "id": 8,
        "question": "An operational amplifier ideally has:",
        "options": [
          "Very low input impedance",
          "Very high input impedance",
          "Zero voltage gain",
          "Very high output impedance"
        ],
        "answer": "Very high input impedance",
        "explanation": "An ideal op-amp has infinite input impedance, so it draws ideally no input current."
      }
    ]
  },
  {
    "id": "digital",
    "subject": "Digital Electronics",
    "description": "Logic gates, Boolean algebra, flip-flops and digital circuits.",
    "questions": [
      {
        "id": 1,
        "question": "Which logic gate produces HIGH output only when all inputs are HIGH?",
        "options": [
          "OR",
          "AND",
          "XOR",
          "NOR"
        ],
        "answer": "AND",
        "explanation": "An AND gate produces HIGH only when every input is HIGH."
      },
      {
        "id": 2,
        "question": "What is the binary representation of decimal 10?",
        "options": [
          "1001",
          "1010",
          "1100",
          "1110"
        ],
        "answer": "1010",
        "explanation": "Decimal 10 is represented as 1010 in binary."
      },
      {
        "id": 3,
        "question": "Which gate is known as an universal gate?",
        "options": [
          "AND",
          "OR",
          "NAND",
          "XOR"
        ],
        "answer": "NAND",
        "explanation": "NAND is a universal gate because any basic logic function can be constructed using NAND gates."
      },
      {
        "id": 4,
        "question": "A flip-flop is primarily used to:",
        "options": [
          "Store one bit",
          "Amplify voltage",
          "Convert AC to DC",
          "Generate analog signals"
        ],
        "answer": "Store one bit",
        "explanation": "A flip-flop is a bistable circuit capable of storing one binary bit."
      },
      {
        "id": 5,
        "question": "Which number system uses only 0 and 1?",
        "options": [
          "Decimal",
          "Octal",
          "Binary",
          "Hexadecimal"
        ],
        "answer": "Binary",
        "explanation": "The binary number system has base 2 and uses only 0 and 1."
      },
      {
        "id": 6,
        "question": "What is the output of an XOR gate when both inputs are 1?",
        "options": [
          "0",
          "1",
          "Depends on frequency",
          "Undefined"
        ],
        "answer": "0",
        "explanation": "XOR produces HIGH when its inputs are different. With inputs 1 and 1, the output is 0."
      },
      {
        "id": 7,
        "question": "Which circuit converts binary information into one of several output lines?",
        "options": [
          "Demultiplexer",
          "Decoder",
          "Adder",
          "Comparator"
        ],
        "answer": "Decoder",
        "explanation": "A decoder converts an n-bit binary input into one of up to 2ⁿ output lines."
      },
      {
        "id": 8,
        "question": "Which circuit adds two binary numbers?",
        "options": [
          "Counter",
          "Multiplexer",
          "Adder",
          "Encoder"
        ],
        "answer": "Adder",
        "explanation": "An adder performs binary addition."
      }
    ]
  },
  {
    "id": "communication",
    "subject": "Communication Systems",
    "description": "Modulation, signals and communication concepts.",
    "questions": [
      {
        "id": 1,
        "question": "What does AM stand for in communication systems?",
        "options": [
          "Amplitude Modulation",
          "Analog Multiplication",
          "Automatic Modulation",
          "Amplitude Multiplication"
        ],
        "answer": "Amplitude Modulation",
        "explanation": "AM stands for Amplitude Modulation, where the carrier amplitude varies according to the message signal."
      },
      {
        "id": 2,
        "question": "In frequency modulation, which property of the carrier changes?",
        "options": [
          "Amplitude",
          "Frequency",
          "Phase only",
          "Power supply"
        ],
        "answer": "Frequency",
        "explanation": "FM varies the instantaneous frequency of the carrier according to the message signal."
      },
      {
        "id": 3,
        "question": "What is the main purpose of modulation?",
        "options": [
          "Reduce all noise to zero",
          "Enable efficient transmission of information",
          "Eliminate antennas",
          "Remove the carrier"
        ],
        "answer": "Enable efficient transmission of information",
        "explanation": "Modulation makes transmission practical by shifting information onto a suitable carrier frequency."
      },
      {
        "id": 4,
        "question": "Which modulation technique varies the carrier phase?",
        "options": [
          "AM",
          "FM",
          "PM",
          "ASK only"
        ],
        "answer": "PM",
        "explanation": "Phase modulation changes the phase of the carrier according to the message signal."
      },
      {
        "id": 5,
        "question": "What does SNR represent?",
        "options": [
          "Signal-to-Noise Ratio",
          "Signal Network Response",
          "System Noise Resistance",
          "Sampling Network Rate"
        ],
        "answer": "Signal-to-Noise Ratio",
        "explanation": "SNR compares the strength of the desired signal with the strength of background noise."
      },
      {
        "id": 6,
        "question": "Which medium uses electromagnetic waves through free space?",
        "options": [
          "Wireless communication",
          "Twisted-pair cable",
          "Coaxial cable only",
          "Fiber core only"
        ],
        "answer": "Wireless communication",
        "explanation": "Wireless communication uses electromagnetic waves propagating through free space."
      },
      {
        "id": 7,
        "question": "What is the basic purpose of a receiver?",
        "options": [
          "Generate only noise",
          "Recover information from a received signal",
          "Destroy the carrier",
          "Increase antenna size"
        ],
        "answer": "Recover information from a received signal",
        "explanation": "A receiver processes the received signal and recovers the transmitted information."
      },
      {
        "id": 8,
        "question": "Which technique converts a continuous-time signal into discrete samples?",
        "options": [
          "Sampling",
          "Amplification",
          "Modulation",
          "Filtering only"
        ],
        "answer": "Sampling",
        "explanation": "Sampling converts a continuous-time signal into a sequence of values taken at discrete time instants."
      }
    ]
  },
  {
    "id": "embedded",
    "subject": "Embedded Systems",
    "description": "Microcontrollers, GPIO, protocols and embedded systems.",
    "questions": [
      {
        "id": 1,
        "question": "What is an embedded system?",
        "options": [
          "A general-purpose desktop only",
          "A computer system designed for a specific function",
          "A database server",
          "A web browser"
        ],
        "answer": "A computer system designed for a specific function",
        "explanation": "An embedded system is designed to perform a dedicated function within a larger system."
      },
      {
        "id": 2,
        "question": "Which component executes instructions in a microcontroller?",
        "options": [
          "CPU",
          "Resistor",
          "Capacitor",
          "LED"
        ],
        "answer": "CPU",
        "explanation": "The CPU or processor core executes program instructions."
      },
      {
        "id": 3,
        "question": "What does GPIO stand for?",
        "options": [
          "General Purpose Input/Output",
          "General Processing Internal Output",
          "Global Peripheral Input Operation",
          "General Program Interface Option"
        ],
        "answer": "General Purpose Input/Output",
        "explanation": "GPIO stands for General Purpose Input/Output and provides configurable digital input and output pins."
      },
      {
        "id": 4,
        "question": "Which protocol is commonly used for serial communication between embedded devices?",
        "options": [
          "UART",
          "HTML",
          "CSS",
          "JPEG"
        ],
        "answer": "UART",
        "explanation": "UART is a widely used asynchronous serial communication interface."
      },
      {
        "id": 5,
        "question": "What is the purpose of a timer in a microcontroller?",
        "options": [
          "Measure or generate time-related events",
          "Store images permanently",
          "Replace the CPU",
          "Increase RAM capacity"
        ],
        "answer": "Measure or generate time-related events",
        "explanation": "Timers can measure intervals, generate delays, and trigger periodic events."
      },
      {
        "id": 6,
        "question": "Which memory is typically non-volatile?",
        "options": [
          "RAM",
          "Cache",
          "Flash memory",
          "CPU register"
        ],
        "answer": "Flash memory",
        "explanation": "Flash memory retains stored data even when power is removed."
      },
      {
        "id": 7,
        "question": "What is an interrupt used for?",
        "options": [
          "Notify the processor that an event needs attention",
          "Increase screen resolution",
          "Remove all program instructions",
          "Convert AC into DC"
        ],
        "answer": "Notify the processor that an event needs attention",
        "explanation": "An interrupt allows hardware or software events to request processor attention."
      },
      {
        "id": 8,
        "question": "Which device is commonly used to sense physical conditions?",
        "options": [
          "Sensor",
          "Compiler",
          "Router",
          "Register only"
        ],
        "answer": "Sensor",
        "explanation": "Sensors detect physical quantities such as temperature, light, pressure, or motion."
      }
    ]
  },
  {
    "id": "signals",
    "subject": "Signals & Systems",
    "description": "Signals, systems, transforms and signal processing.",
    "questions": [
      {
        "id": 1,
        "question": "A signal that repeats itself after a fixed interval is called:",
        "options": [
          "Periodic",
          "Random",
          "Transient",
          "Constant only"
        ],
        "answer": "Periodic",
        "explanation": "A periodic signal repeats its waveform after a fixed time period."
      },
      {
        "id": 2,
        "question": "What is the SI unit of frequency?",
        "options": [
          "Volt",
          "Hertz",
          "Ohm",
          "Watt"
        ],
        "answer": "Hertz",
        "explanation": "Frequency is measured in hertz (Hz), representing cycles per second."
      },
      {
        "id": 3,
        "question": "What does a system's impulse response describe?",
        "options": [
          "Its response to an impulse input",
          "Its maximum voltage only",
          "Its power consumption only",
          "Its physical size"
        ],
        "answer": "Its response to an impulse input",
        "explanation": "The impulse response is the output produced by a system when the input is an impulse."
      },
      {
        "id": 4,
        "question": "Which transform is commonly used to analyze signals in the frequency domain?",
        "options": [
          "Fourier transform",
          "Boolean transform",
          "Binary transform",
          "Logic transform"
        ],
        "answer": "Fourier transform",
        "explanation": "The Fourier transform represents a signal in terms of its frequency components."
      },
      {
        "id": 5,
        "question": "A continuous-time signal is defined for:",
        "options": [
          "Only integer values of time",
          "Every instant of time",
          "Only binary states",
          "Only positive frequencies"
        ],
        "answer": "Every instant of time",
        "explanation": "A continuous-time signal has a value at every instant within its time domain."
      },
      {
        "id": 6,
        "question": "What is convolution commonly used to determine?",
        "options": [
          "Output of an LTI system",
          "Binary code only",
          "CPU temperature only",
          "Resistance of a wire"
        ],
        "answer": "Output of an LTI system",
        "explanation": "For an LTI system, convolution of the input with the impulse response gives the output."
      },
      {
        "id": 7,
        "question": "What is the amplitude of a signal related to?",
        "options": [
          "Its magnitude",
          "Its frequency only",
          "Its time period only",
          "Its phase only"
        ],
        "answer": "Its magnitude",
        "explanation": "Amplitude represents the magnitude or strength of a signal."
      },
      {
        "id": 8,
        "question": "The time period of a periodic signal is the reciprocal of its:",
        "options": [
          "Amplitude",
          "Frequency",
          "Phase",
          "Power"
        ],
        "answer": "Frequency",
        "explanation": "For a periodic signal, T = 1/f, where T is the time period and f is frequency."
      }
    ]
  },
  {
    "id": "microprocessors",
    "subject": "Microprocessors",
    "description": "Architecture, registers, memory and instructions.",
    "questions": [
      {
        "id": 1,
        "question": "Which unit performs arithmetic and logical operations in a processor?",
        "options": [
          "ALU",
          "RAM",
          "Clock",
          "Bus"
        ],
        "answer": "ALU",
        "explanation": "The Arithmetic Logic Unit performs arithmetic and logical operations."
      },
      {
        "id": 2,
        "question": "What is the purpose of the program counter?",
        "options": [
          "Hold the address of the next instruction",
          "Store permanent data",
          "Perform multiplication only",
          "Control the power supply"
        ],
        "answer": "Hold the address of the next instruction",
        "explanation": "The program counter keeps track of the address of the next instruction to be fetched."
      },
      {
        "id": 3,
        "question": "Which register typically stores the result of arithmetic operations in many processor architectures?",
        "options": [
          "Accumulator",
          "Program counter",
          "Stack pointer",
          "Instruction register"
        ],
        "answer": "Accumulator",
        "explanation": "An accumulator is commonly used to hold intermediate and final arithmetic or logical results."
      },
      {
        "id": 4,
        "question": "What does RAM stand for?",
        "options": [
          "Random Access Memory",
          "Read Access Module",
          "Rapid Arithmetic Memory",
          "Register Address Memory"
        ],
        "answer": "Random Access Memory",
        "explanation": "RAM stands for Random Access Memory."
      },
      {
        "id": 5,
        "question": "Which bus carries memory addresses?",
        "options": [
          "Data bus",
          "Address bus",
          "Control bus",
          "Power bus"
        ],
        "answer": "Address bus",
        "explanation": "The address bus carries the address of the memory or I/O location being accessed."
      },
      {
        "id": 6,
        "question": "What is the function of the instruction register?",
        "options": [
          "Hold the current instruction",
          "Store the operating voltage",
          "Generate analog signals",
          "Measure temperature"
        ],
        "answer": "Hold the current instruction",
        "explanation": "The instruction register temporarily holds the instruction currently being decoded or executed."
      },
      {
        "id": 7,
        "question": "Which component synchronizes processor operations?",
        "options": [
          "Clock",
          "RAM",
          "ALU only",
          "Speaker"
        ],
        "answer": "Clock",
        "explanation": "The processor clock provides timing signals that synchronize processor operations."
      },
      {
        "id": 8,
        "question": "What does CPU stand for?",
        "options": [
          "Central Processing Unit",
          "Central Program Utility",
          "Computer Peripheral Unit",
          "Control Processing Utility"
        ],
        "answer": "Central Processing Unit",
        "explanation": "CPU stands for Central Processing Unit."
      }
    ]
  }
]

module.exports = { quizzes }
