import { Users } from "lucide-react"; // Assuming you're using lucide-react for icons

const Clients = () => {
  const clients = [
    { id: 1, name: "Client 1", description: "A brief description about this client and their relationship with us." },
    { id: 2, name: "Client 2", description: "A brief description about this client and their relationship with us." },
    { id: 3, name: "Client 3", description: "A brief description about this client and their relationship with us." },
    { id: 4, name: "Client 4", description: "A brief description about this client and their relationship with us." },
    { id: 5, name: "Client 5", description: "A brief description about this client and their relationship with us." },
    { id: 6, name: "Client 6", description: "A brief description about this client and their relationship with us." },
  ];

  return (
    <section id="clients" className="">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#2c3e50] text-center">Our Clients</h2>
      <p className="text-lg text-center mt-4 text-gray-600">We take pride in working with some of the best clients in the industry.</p>

      {/* Client Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center"
          >
            {/* Client Icon */}
            <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
              <Users className="w-10 h-10 text-gray-500" />
            </div>

            {/* Client Name */}
            <h3 className="font-semibold text-xl text-gray-700">{client.name}</h3>

            {/* Client Description */}
            <p className="text-sm text-gray-500 text-center mt-3">
              {client.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
