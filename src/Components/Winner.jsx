import React from 'react';

const Winner = () => {
    return (
        <div>
            <section className="bg-gray-100 py-12 mt-14">
  <h2 className="text-2xl text-center font-bold mb-6">Recent Winners</h2>

  <div className="grid md:grid-cols-3 gap-6 container mx-auto px-3">
    <div className="bg-white shadow p-6 rounded">
      <h3 className="font-bold mb-2">Aisha Rahman</h3>
      <p>Won: Logo Design</p>
      <p className="font-bold text-green-600">Prize: $100</p>
    </div>
    <div className="bg-white shadow p-6 rounded">
      <h3 className="font-bold mb-2">Imran Hossain</h3>
      <p>Won: Article Writing</p>
      <p className="font-bold text-green-600">Prize: $70</p>
    </div>
    <div className="bg-white shadow p-6 rounded">
      <h3 className="font-bold mb-2">Naila Akter</h3>
      <p>Won: Photography Contest</p>
      <p className="font-bold text-green-600">Prize: $50</p>
    </div>
  </div>
</section>
        </div>
    );
};

export default Winner;