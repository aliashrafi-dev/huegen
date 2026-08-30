import { Particles } from "@/components/ui/particles"
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"
import Image from "next/image"
import { TextAnimate } from "@/components/ui/text-animate"



export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
    
      <div className="fixed inset-0 -z-10 h-screen w-screen pointer-events-none overflow-hidden">
        <Particles quantity={100} ease={80} refresh={false} />
      </div>

      <div className="flex flex-col items-center justify-center text-6xl md:text-5xl font-extrabold translate-y-150">
          <TextAnimate animation="blurInUp" by="character" duration={5}>
      Color made simple
    </TextAnimate>
    </div>

      
      <div className="flex min-h-screen items-center justify-center py-20 translate-y-40">
        <ScrollVelocityContainer className="text-4xl font-bold md:text-7xl">
          <ScrollVelocityRow baseVelocity={20} direction={1}>
            
            <div className="flex items-center gap-6 px-3">
              <img src="/photo1.jpg" alt="1" className="h-40 w-60 rounded-xl object-cover" />
              <img src="/photo2.jpg" alt="2" className="h-40 w-60 rounded-xl object-cover" />
              <img src="/photo3.jpg" alt="3" className="h-40 w-60 rounded-xl object-cover" />
              <img src="/photo4.jpg" alt="3" className="h-40 w-60 rounded-xl object-cover" />
              <img src="/photo5.jpg" alt="3" className="h-40 w-60 rounded-xl object-cover" />
            </div>
          </ScrollVelocityRow>

          <ScrollVelocityRow baseVelocity={20} direction={-1}>
                        <div className="flex items-center gap-6 px-3">
              <img src="/img1.jpeg" alt="1" className="h-40 w-60 rounded-xl object-cover" />
              <img src="/img2.jpeg" alt="2" className="h-40 w-60 rounded-xl object-cover" />
              <img src="/image3.jpeg" alt="3" className="h-40 w-60 rounded-xl object-cover" />
              <img src="/image4.jpeg" alt="3" className="h-40 w-60 rounded-xl object-cover" />
              <img src="/image5.jpeg" alt="3" className="h-40 w-60 rounded-xl object-cover" />
            </div>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>
    </main>
  )
}