import React from 'react';

const ExtraStaticSection = () => {
    return (
        <div>
           <section className="py-16 container mx-auto px-3">
  <h2 className="text-2xl font-bold text-center mb-8">Why Join ContestHub?</h2>

  <div className="grid md:grid-cols-3 gap-6">
    <div className="shadow p-6 rounded text-center">
      <h3 className="font-bold mb-2">Boost Your Skills</h3>
      <p>Compete in creative contests and improve your abilities.</p>
    </div>
    <div className="shadow p-6 rounded text-center">
      <h3 className="font-bold mb-2">Win Rewards</h3>
      <p>Get prize money and certificates for your achievements.</p>
    </div>
    <div className="shadow p-6 rounded text-center">
      <h3 className="font-bold mb-2">Show Your Talent</h3>
      <p>Build your portfolio by participating in unique challenges.</p>
    </div>
  </div>
</section> 
        </div>
    );
};

export default ExtraStaticSection;