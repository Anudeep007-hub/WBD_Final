import React, { useEffect } from 'react';
import Header from '../shoppingFolder/components/Header.jsx';

const Index = () => {
  // Animation effect on page load
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('animate-fade-in');
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div className="animate-on-load opacity-0">
                <span className="inline-block rounded-full bg-mall-accent/10 px-4 py-1 text-sm font-medium text-mall-accent">
                  Premium Shopping Experience
                </span>
              </div>
              <h1 className="animate-on-load opacity-0 text-4xl font-bold tracking-tight text-mall-primary md:text-5xl lg:text-6xl" style={{ letterSpacing: '-0.02em' }}>
                Discover a New Way to Shop
              </h1>
              <p className="animate-on-load opacity-0 text-lg text-mall-muted md:text-xl">
                Experience the future of shopping with our innovative mall concept. Find exclusive brands, deals, and events all in one place.
              </p>
              <div className="animate-on-load opacity-0 flex flex-wrap gap-4">
                <button className="mall-button">
                  Explore Shops
                </button>
                <button className="rounded-full border border-mall-primary/20 bg-transparent px-4 py-2 text-mall-primary transition-all duration-300 hover:bg-mall-subtle active:scale-95">
                  View Map
                </button>
              </div>
            </div>
            <div className="animate-on-load opacity-0 relative h-[300px] w-full overflow-hidden rounded-2xl bg-gradient-to-tr from-mall-accent/10 to-purple-100 md:h-[500px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529771-7888783a18d3?q=80&w=1074&auto=format&fit=crop')] bg-cover bg-center opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Cards */}
      <section className="bg-mall-secondary py-20">
        <div className="container mx-auto px-4">
          <h2 className="animate-on-load opacity-0 mb-12 text-center text-3xl font-bold tracking-tight text-mall-primary md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            Explore Our Mall
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Premium Stores',
                description: 'Discover exclusive brands and boutiques offering the finest selection of products.',
                icon: '🛍️'
              },
              {
                title: 'Special Deals',
                description: 'Take advantage of limited-time offers and discounts from your favorite stores.',
                icon: '💰'
              },
              {
                title: 'Amazing Events',
                description: 'Join exciting events, workshops, and exhibitions happening throughout the year.',
                icon: '🎉'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="animate-on-load opacity-0 group flex flex-col rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-4 rounded-full bg-mall-subtle p-3 text-2xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-mall-primary">{feature.title}</h3>
                <p className="text-mall-muted">{feature.description}</p>
                <div className="mt-4 flex items-center text-mall-accent">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 12.5L11 8L6.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
