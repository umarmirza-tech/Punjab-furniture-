import React from 'react';
import { ReviewsSection } from '../components/ReviewsSection';
import { SpecialCTA } from '../components/SpecialCTA';

export const ReviewsPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F5] min-h-screen py-8">
      <ReviewsSection />
      <SpecialCTA />
    </div>
  );
};
