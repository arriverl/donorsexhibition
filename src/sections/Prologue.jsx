import useIsMobile from '../hooks/useIsMobile'
import PrologueMobile from './PrologueMobile'
import PrologueWheel from './PrologueWheel'

export default function Prologue() {
  const isMobile = useIsMobile()
  return isMobile ? <PrologueMobile /> : <PrologueWheel />
}
