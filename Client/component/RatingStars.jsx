import { Star } from 'lucide-react'

export default function RatingStars({ rating }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className="flex gap-1 items-center">
      {stars.map((star) => (
        <Star
          key={star}
          size={18}
          className={`${
            star <= rating ? 'fill-first text-first' : 'text-gray-500'
          }`}
        />
      ))}
    </div>
  )
}
