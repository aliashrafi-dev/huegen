import { Particles } from "@/components/ui/particles"
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"
import Image from "next/image"
import { TextAnimate } from "@/components/ui/text-animate"
import {ColorInputCard} from "@/components/ColorInputCard"
const row1Images = [
  { src: "/photo1.jpg", alt: "Photo 1" },
  { src: "/photo2.jpg", alt: "Photo 2" },
  { src: "/photo3.jpg", alt: "Photo 3" },
  { src: "/photo4.jpg", alt: "Photo 4" },
  { src: "/photo5.jpg", alt: "Photo 5" },
]

const row2Images = [
  { src: "/img1.jpeg", alt: "Image 1" },
  { src: "/img2.jpeg", alt: "Image 2" },
  { src: "/image3.jpeg", alt: "Image 3" },
  { src: "/image4.jpeg", alt: "Image 4" },
  { src: "/image5.jpeg", alt: "Image 5" },
]

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background Particles */}
      <div className="fixed inset-0 -z-10 h-screen w-screen pointer-events-none">
        <Particles quantity={100} ease={80} refresh={false} />
      </div>

      {/* Animated Text Section */}
      <div className="flex flex-col items-center justify-center text-2xl md:text-2xl  pt-20">
        <TextAnimate animation="blurInUp" by="character" duration={5}>
          Color Made by
        </TextAnimate>
      </div>

      {/* brand text */}
      <div className="flex flex-col items-center justify-center text-5xl font-extrabold pt-5">
        <h1>H u e g e n</h1>
        </div>
      {/* Scroll Velocity Section */}
      <div className="flex items-center justify-center pt-40">
        <ScrollVelocityContainer className="text-4xl font-bold md:text-7xl">
          <ScrollVelocityRow baseVelocity={5} direction={1}>
            <div className="flex items-center gap-6 px-3">
              {row1Images.map((img, i) => (
                <Image
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  width={240}
                  height={160}
                  className="h-40 w-60 rounded-xl object-cover"
                />
              ))}
            </div>
          </ScrollVelocityRow>

          <ScrollVelocityRow baseVelocity={5} direction={-1}>
            <div className="flex items-center gap-6 px-3">
              {row2Images.map((img, i) => (
                <Image
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  width={240}
                  height={160}
                  className="h-40 w-60 rounded-xl object-cover"
                />
              ))}
            </div>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>
      <div className="flex py-30 items-center justify-center">
        <ColorInputCard/>
      </div>

    </main>
  )
}