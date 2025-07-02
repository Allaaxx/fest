"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import type SwiperCore from "swiper"
import { useRef } from "react"
import { ArrowLeft, ArrowRight, Package } from "lucide-react"
import "swiper/css"

export default function ProductImageCarousel({
  images,
  selectedImage,
  setSelectedImage,
  productName,
}: {
  images: File[]
  selectedImage: number
  setSelectedImage: (idx: number) => void
  productName: string
}) {
  const swiperRef = useRef<SwiperCore | null>(null)

  return (
    <div className="relative w-full flex flex-col items-center carrossel-container">
      <div className="relative w-full flex items-end overflow-hidden rounded-lg">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setSelectedImage(swiper.realIndex)}
          initialSlide={selectedImage}
          className="w-full aspect-square"
        >
          {images.length > 0 ? (
            images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={URL.createObjectURL(img) || "/placeholder.svg"}
                  className="w-full h-full object-cover bg-gray-100 aspect-square rounded-[20px]"
                  alt={productName}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="w-full h-full aspect-square bg-gray-100 rounded-[20px] flex items-center justify-center">
                <Package className="w-12 h-12 text-[#f0739f]" />
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#051922] text-[#f0739f] rounded-full p-2 z-10 hover:bg-[#394d58] transition-colors"
          aria-label="Anterior"
          onClick={() => {
            if (swiperRef.current) swiperRef.current.slidePrev()
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#f0739f] text-[#051922] rounded-full p-2 z-10 hover:bg-[#f53377] transition-colors"
          aria-label="Próximo"
          onClick={() => {
            if (swiperRef.current) swiperRef.current.slideNext()
          }}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 w-full justify-center">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedImage(idx)
                if (swiperRef.current) swiperRef.current.slideToLoop(idx)
              }}
              className={`w-1/4 aspect-square cursor-pointer border-2 rounded-[20px] overflow-hidden flex items-center justify-center bg-gray-100 transition-all duration-200 ${
                selectedImage === idx ? "border-[#f0739f]" : "border-transparent"
              }`}
            >
              <img
                src={URL.createObjectURL(img) || "/placeholder.svg"}
                className="w-full h-full object-cover aspect-square rounded-[20px]"
                alt={productName}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
