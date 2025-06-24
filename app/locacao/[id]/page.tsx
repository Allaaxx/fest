"use client";

import { useState, useRef } from "react";
import {
  Star,
  Heart,
  Share2,
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/components/providers/cart-provider";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale/pt-BR";
import "@/styles/locacao-responsive.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Dados simulados do produto de locação
const product = {
  id: "2",
  name: "Kit Locação Festa Infantil",
  price: 199.99,
  originalPrice: 249.99,
  type: "locacao",
  rating: 4.7,
  reviews: 87,
  description:
    "Kit completo para locação de festa infantil, com decoração temática, mesas, cadeiras e itens personalizados.",
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  vendor: {
    name: "Festas Incríveis",
    rating: 4.8,
    location: "Rio de Janeiro, RJ",
  },
  availability: true,
  features: [
    "Decoração temática",
    "Mesas e cadeiras",
    "Painel personalizado",
    "Bolo fake",
    "Itens de iluminação",
  ],
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#051922",
      contrastText: "#F0739F",
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#051922",
            color: "#F0739F",
          },
          "&.Mui-selected:hover, &.Mui-selected:focus": {
            backgroundColor: "#051922",
            color: "#F0739F !important",
          },
        },
      },
    },
  },
});

export default function LocacaoProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        type: product.type as "venda" | "locacao" | "servico",
        image: product.images[0],
        startDate: startDate?.toISOString(),
        // Removido endDate, pois não será mais utilizado
      },
    });
  };

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      type: product.type as "venda" | "locacao" | "servico",
    });
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(product.id);
  };

  function handleShare() {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <section className="container mx-auto my-4 mt-16 flex flex-col lg:flex-row">
        <div className="flex flex-col items-center w-full lg:w-1/2 mb-5 mt-5 p-5">
          {/* Carrossel principal */}
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
                {product.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      className="w-full h-full object-cover bg-gray-100 aspect-square rounded-[20px]"
                      alt={product.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                className="swiper-button-prev bg-fest-black2 text-fest-primary"
                aria-label="Anterior"
                onClick={() => {
                  if (swiperRef.current) swiperRef.current.slidePrev();
                }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                className="swiper-button-next bg-fest-primary text-fest-black2"
                aria-label="Próximo"
                onClick={() => {
                  if (swiperRef.current) swiperRef.current.slideNext();
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2 mt-3 w-full justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(idx);
                    if (swiperRef.current) swiperRef.current.slideToLoop(idx);
                  }}
                  className={`w-1/4 aspect-square cursor-pointer border-2 rounded-[20px] overflow-hidden flex items-center justify-center bg-gray-100 transition-all duration-200 ${
                    selectedImage === idx
                      ? "border-fest-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover aspect-square rounded-[20px]"
                    alt={product.name}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-6 p-5">
          {/* Card principal */}
          <div className="flex flex-col gap-4 mt-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between card-component">
              <a
                href="/loja"
                className="text-black flex items-center gap-3 mb-2 sm:mb-0"
              >
                <ExternalLink className="w-5 h-5" />
                <h4 className="m-0 font-light">Voltar a loja</h4>
              </a>
              <div className="flex items-center gap-3">
                <h6 className="font-light m-0">Locação do Dia</h6>
                <Calendar className="h-8 w-8 text-fest-primary " />
              </div>
            </div>
            <div className="mt-5">
              <h5 className="mb-4 px-4 font-light text-gray-400 ">
                Categoria:{" "}
                {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
              </h5>
              <p className="mb-2 px-3 break-words font-normal text-2xl card-title">
                {product.name}
              </p>
            </div>
            <div className="flex flex-wrap mb-4 items-end justify-start gap-4 card-price">
              <h3 className="mb-2 px-3 break-words font-normal text-2xl text-fest-primary">
                R${" "}
                {product.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </h3>
              <h4 className="mb-2 px-3 break-words text-gray-500 line-through font-light text-xl">
                R${" "}
                {product.originalPrice.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </h4>
            </div>
            {/* Datas de locação */}
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}
            >
              <div className="flex flex-col gap-4 px-3 mb-3">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Selecione o dia da retirada:
                </label>
                <DatePicker
                  label="Data de Retirada"
                  value={startDate}
                  views={["day", "month", "year"]}
                  onChange={setStartDate}
                  yearsOrder="desc"
                  disablePast
                  timezone="America/Sao_Paulo"
                  showDaysOutsideCurrentMonth
                  localeText={{
                    previousMonth: "Mês anterior",
                    nextMonth: "Próximo mês",
                    openPreviousView: "Abrir visualização anterior",
                    openNextView: "Abrir próxima visualização",
                    cancelButtonLabel: "Cancelar",
                    clearButtonLabel: "Limpar",
                    todayButtonLabel: "Hoje",
                    okButtonLabel: "OK",
                    start: "Início",
                    end: "Fim",
                    toolbarTitle: "Selecionar data",
                  }}
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                    day: {
                      sx: {
                        "&.Mui-selected": {
                          backgroundColor: "#051922",
                          color: "#fff",
                        },
                        "&:hover": {
                          backgroundColor: "#f0739f",
                          color: "#fff",
                        },
                        "&.Mui-selected:focus": {
                          backgroundColor: "#051922",
                          color: "#fff",
                        },
                        "&.MuiPickersDay-today": {
                          borderColor: "#f0739f",
                        },
                      },
                    },
                    popper: {
                      sx: {
                        "& .MuiPickersArrowSwitcher-root": {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "40%",
                          gap: 0,
                        },
                        "& .MuiPickersArrowSwitcher-spacer": {
                          display: "none",
                        },
                        "& .css-1jyby0c-MuiMonthCalendar-button.Mui-selected:focus, .css-1jyby0c-MuiMonthCalendar-button.Mui-selected:hover":
                          {
                            backgroundColor: "#f0739f",
                            color: "#fff",
                          },
                        "& .css-1jyby0c-MuiMonthCalendar-button.Mui-selected:hover":
                          {
                            backgroundColor: "#f0739f",
                            color: "#fff",
                          },
                        "& .MuiPickersCalendarHeader-labelContainer": {
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minWidth: 120,
                        },
                        "& .MuiPickersCalendarHeader-label": {
                          color: "#051922",
                          fontWeight: 600,
                          textAlign: "center",
                          width: "100%",
                          minWidth: 120,
                          position: "relative",
                          zIndex: 1,
                        },
                        "& .MuiPickersArrowSwitcher-button": {
                          color: "#f0739f",
                          background: "#051922",
                          borderRadius: "50px",
                          width: 48,
                          height: 32,
                          margin: "0 8px",
                          transition: "background 0.2s",
                          "&:hover": {
                            background: "#f0739f",
                            color: "#fff",
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    width: {
                      xs: "100%", // 100% em telas pequenas
                      md: "50%", // 50% em telas médias/grandes
                    },
                    minWidth: 200,
                    maxWidth: 350,
                  }}
                />
              </div>
            </LocalizationProvider>
            <div className="mb-5 flex items-end justify-start px-3 gap-5 flex-wrap">
              <div className="font-light flex items-end gap-2">
                <h4 className="m-0 font-light text-xl text-gray-500 ">
                  Código do produto:
                </h4>
                <h4 className="font-bold mb-0 ">LOC-2025-001</h4>
              </div>
              <div className="flex items-center gap-1 text-black">
                <CheckSquare
                  className={`w-5 h-5 ${
                    product.availability ? "text-black" : "text-gray-400"
                  }`}
                />
                <h6
                  className={`m-0 text-lg font-bold ${
                    product.availability ? "text-black" : "text-gray-400"
                  }`}
                >
                  {product.availability
                    ? "Disponível para locação"
                    : "Indisponível"}
                </h6>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-4 px-3 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(Math.floor(product.rating))].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                {[...Array(5 - Math.floor(product.rating))].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-300" />
                ))}
              </div>
              <h4 className="m-0 font-light text-xl">{product.rating}</h4>
              <h5 className="mb-0 font-light text-black text-base">
                {product.reviews} Avaliações
              </h5>
            </div>
          </div>
          {/* Botões de ação */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <form>
              <input type="hidden" />
              <Button
                type="submit"
                variant="outline"
                size="lg"
                className="rounded-full border hover:bg-white hover:border-fest-black2 text-black2 bg-fest-primary px-6 py-2 font-semibold shadow  hover:text-fest-black2 transition"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
              >
                Alugar agora
              </Button>
            </form>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border p-2"
              onClick={() => {
                isInWishlist(product.id)
                  ? handleRemoveFromWishlist()
                  : handleAddToWishlist();
              }}
            >
              <Heart
                className={`w-5 h-5 ${
                  isInWishlist(product.id)
                    ? "fill-fest-primary text-fest-primary"
                    : ""
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border p-2"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
      {/* Tabs com Informações Detalhadas */}
      <div className="w-full lg:w-1/2 mt-6 lg:mt-0 px-5 mx-auto mb-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="features">Características</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card className="shadow-none border-none p-0 bg-white">
              <CardContent className="p-0">
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="mt-6">
            <Card className="shadow-none border-none p-0 bg-white">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-4">O que está incluso:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-fest-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card className="shadow-none border-none p-0 bg-white">
              <CardContent className="p-0">
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    Sistema de avaliações em desenvolvimento
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  );
}
