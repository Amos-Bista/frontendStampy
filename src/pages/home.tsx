import { FooterSection } from '../component/layout/footer/FooterSection'
import HeroSection from '../component/layout/home/heroSection'
import LoyaltyStatsSection from '../component/layout/home/loyaltySection/LoyaltyStatsSection'
import WhyStampMeSection from '../component/layout/home/whyStampMe/WhyStampMeSection'

const Home = () => {
    return (
        <div>
            <HeroSection />
            <main className="flex-1">
                <LoyaltyStatsSection />
                <WhyStampMeSection />
            </main>
            <FooterSection />
        </div>
    )
}

export default Home