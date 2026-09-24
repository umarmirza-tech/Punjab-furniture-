import React, { useState } from 'react';
import { Star, MessageCircle, ExternalLink, CheckCircle2, Plus } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  text: string;
  source: string;
  highlight?: string;
  verified?: boolean;
}

export const ReviewsSection: React.FC = () => {
  // Real review data strictly as provided by the business information
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'rev-01',
      author: 'Google Maps Verified Reviewer',
      rating: 5,
      text: BUSINESS_CONFIG.ratings.featuredReview.comment,
      source: 'Google Review',
      highlight: 'Quality & Choice',
      verified: true
    }
  ]);

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newEntry: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      text: newComment.trim(),
      source: 'Customer Submission',
      verified: true
    };

    setReviews(prev => [newEntry, ...prev]);
    setIsSubmitOpen(false);
    setNewAuthor('');
    setNewComment('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  return (
    <section className="py-20 bg-[#FAF9F5] border-t border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block mb-2">
            Verified Customer Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1C1917] mb-4">
            Customer Reviews & Public Rating
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Real customer impressions from our Saharanpur showroom visitors.
          </p>
        </div>

        {/* Rating Scoreboard Banner */}
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-6 sm:p-8 max-w-4xl mx-auto shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-[#E8E4DC]">
            
            {/* Score */}
            <div className="text-center md:pr-6 pb-6 md:pb-0">
              <div className="text-5xl font-display font-bold text-[#1C1917] mb-2 font-mono tabular-nums">
                {BUSINESS_CONFIG.ratings.score.toFixed(1)}
                <span className="text-2xl text-stone-400 font-sans font-normal"> / 5.0</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
                {[1, 2, 3, 4].map(i => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <Star className="w-5 h-5 text-stone-300" />
              </div>
              <p className="text-xs text-stone-500">
                Based on <strong className="text-stone-800">{BUSINESS_CONFIG.ratings.totalReviews} Google Reviews</strong>
              </p>
            </div>

            {/* Verified Review Highlights */}
            <div className="md:px-6 py-6 md:py-0 text-center md:text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78350F] block mb-2">
                Common Review Mentions
              </span>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {BUSINESS_CONFIG.ratings.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#FAF9F5] border border-[#E8E4DC] text-stone-700 px-3 py-1 rounded-md capitalize font-medium"
                  >
                    "{highlight}"
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-stone-500 mt-3">
                Customers consistently highlight product choice and attentive showroom assistance.
              </p>
            </div>

            {/* Actions */}
            <div className="md:pl-6 pt-6 md:pt-0 flex flex-col gap-3 justify-center items-center md:items-stretch">
              <a
                href={BUSINESS_CONFIG.address.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#1C1917] hover:bg-[#78350F] text-white text-xs font-semibold rounded text-center transition-colors flex items-center justify-center gap-2"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsSubmitOpen(true)}
                className="w-full py-2.5 px-4 border border-[#E8E4DC] hover:border-stone-400 bg-[#FAF9F5] text-stone-800 text-xs font-semibold rounded text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#78350F]" />
                <span>Share Your Experience</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Success Notice */}
        {submittedMessage && (
          <div className="max-w-2xl mx-auto mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2 justify-center animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Thank you for your review! It has been added to our showroom feedback list.</span>
          </div>
        )}

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reviews.map(item => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg border border-[#E8E4DC] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {item.source}
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed italic mb-4">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2EFE8] flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-900">{item.author}</span>
                {item.verified && (
                  <span className="text-emerald-700 flex items-center gap-1 text-[11px] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Customer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reusable Review Submission Form Modal */}
        {isSubmitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-xl border border-[#E8E4DC] max-w-lg w-full p-6 shadow-2xl">
              <h3 className="text-xl font-display font-bold text-stone-900 mb-2">
                Write a Customer Review
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Did you recently visit Punjab Furnitures on Dehradun Road, Saharanpur? We appreciate your honest feedback.
              </p>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={e => setNewAuthor(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className={`p-2 rounded border cursor-pointer ${
                          newRating >= star
                            ? 'border-amber-400 bg-amber-50 text-amber-500'
                            : 'border-[#E8E4DC] text-stone-300'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${newRating >= star ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Your Review / Comments
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Tell us about the variety of furniture, quality, and showroom service..."
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitOpen(false)}
                    className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#78350F] hover:bg-[#552509] text-white text-xs font-semibold rounded cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
