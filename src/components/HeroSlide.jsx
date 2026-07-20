<section style={{ position:'relative', height:'100svh' }}>
  {/* Background photo */}
  <img src='/couple.jpg' style={{
    position:'absolute', inset:0,
    width:'100%', height:'100%',
    objectFit:'cover',
    objectPosition:'center 10%'   // keeps faces visible on mobile!
  }} />
  <div style={{ position:'relative', zIndex:2,
    display:'flex', flexDirection:'column', height:'100%' }}>
    {/* TOP — PV logo + subtitle */}
    <div style={{ padding:'36px 24px 0', textAlign:'center' }}>
      {/* Your PV logo circle and subtitle text */}
    </div>
    {/* SPACER — couple faces visible here */}
    <div style={{ flex:1, minHeight:'180px' }} />
    {/* BOTTOM — frosted glass block */}
    <div style={{
      background:'rgba(15,8,2,0.22)',
      backdropFilter:'blur(12px)',
      borderRadius:'16px',
      padding:'16px 24px 36px',
      margin:'0 12px', textAlign:'center' }}>
      {/* Bride Name  ---  and  ---  Groom Name  ---  Tagline */}
    </div>
  </div>
</section>