#!/usr/bin/env python3
# Faithful static previews of the three ЭЛЕМЕНТ hero variants.
# Pure Pillow + numpy (no browser). Recreates the CSS/canvas/three.js visuals
# closely enough to review the design. Output: previews/*.png
import os, math, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1600, 1000
OUT = os.path.join(os.path.dirname(__file__), '..', 'previews')
os.makedirs(OUT, exist_ok=True)
FD = '/usr/share/fonts/truetype/dejavu/'
def F(sz, bold=True): return ImageFont.truetype(FD + ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf'), sz)

INK=(14,17,22); INK2=(60,66,75); MUT=(114,122,133); LINE=(231,233,237)
BG2=(246,247,249); ACC=(225,29,42); ACC700=(190,21,33); ACC50=(252,235,236)
FA=(255,154,61); FB=(255,77,46); FC=(225,29,42)

def vgrad(w,h,top,bot):
    t=np.linspace(0,1,h)[:,None,None]
    arr=np.array(top)[None,None,:]*(1-t)+np.array(bot)[None,None,:]*t
    return np.repeat(arr,w,axis=1)

def to_img(arr): return Image.fromarray(np.clip(arr,0,255).astype('uint8'),'RGB')

def rrect(d, box, r, fill=None, outline=None, width=1):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

def tracked(d, xy, text, font, fill, spacing=6):
    x,y=xy
    for ch in text:
        d.text((x,y), ch, font=font, fill=fill)
        x+=d.textlength(ch,font=font)+spacing
    return x

def flame(size):
    # returns RGBA flame icon
    s=size*4
    pts=[(.50,.02),(.62,.20),(.60,.34),(.74,.30),(.84,.50),(.86,.70),
         (.74,.88),(.50,.99),(.26,.88),(.16,.70),(.20,.50),(.34,.40),(.40,.24)]
    P=[(int(x*s),int(y*s)) for x,y in pts]
    mask=Image.new('L',(s,s),0); ImageDraw.Draw(mask).polygon(P,fill=255)
    grad=to_img(vgrad(s,s,FA,FC))           # top orange -> bottom red
    out=Image.new('RGBA',(s,s),(0,0,0,0)); out.paste(grad,(0,0),mask)
    return out.resize((size,size),Image.LANCZOS)

def wrap(d, text, font, maxw):
    words=text.split(); lines=[]; cur=''
    for w in words:
        t=(cur+' '+w).strip()
        if d.textlength(t,font=font)<=maxw: cur=t
        else: lines.append(cur); cur=w
    if cur: lines.append(cur)
    return lines

# ---------- shared chrome (nav + left copy) ----------
def base(headline_accent='для развития'):
    img=to_img(vgrad(W,H,(255,255,255),(246,247,249)))
    d=ImageDraw.Draw(img,'RGBA')
    # warm corner glow
    g=np.zeros((H,W,3))
    yy,xx=np.mgrid[0:H,0:W]; cx,cy=W*0.8,180
    dist=np.sqrt((xx-cx)**2+(yy-cy)**2)/620
    a=np.clip(1-dist,0,1)[...,None]**2
    g=np.array([255,241,237])[None,None,:]*a + np.array(img).astype(float)*(1-a)
    img=to_img(g); d=ImageDraw.Draw(img,'RGBA')
    M=70
    # nav
    d.line([(0,84),(W,84)], fill=LINE, width=1)
    fl=flame(34); img.paste(fl,(M,26),fl)
    d.text((M+44,30), 'ЭЛЕМЕНТ', font=F(24), fill=INK)
    menu=['О компании','Продукция','Отраслевые решения','Проекты','Производство','Документы','Контакты']
    x=M+230
    fm=F(17,False)
    for m in menu:
        d.text((x,34), m, font=fm, fill=INK2); x+=d.textlength(m,font=fm)+26
    # CTA pill
    rrect(d,(W-M-168,26,W-M,70),22,fill=ACC)
    d.text((W-M-150,38),'Получить КП',font=F(17),fill=(255,255,255))
    # left copy
    lx=M; ly=240
    tracked(d,(lx,ly),'ГАЗОПОРШНЕВЫЕ УСТАНОВКИ · 24/7',F(15),ACC,spacing=4)
    # headline
    hf=F(74)
    lines=['Энергия','для развития','бизнеса']
    yy=ly+44
    for ln in lines:
        col=ACC if ln==headline_accent else INK
        d.text((lx,yy),ln,font=hf,fill=col); yy+=80
    # lede
    yy+=14; lf=F(20,False)
    lede=('Установки собственного производства для майнинга, промышленных '
          'предприятий, котельных и аквакультуры. Полный цикл — от проекта до сервиса.')
    for ln in wrap(d,lede,lf,560):
        d.text((lx,yy),ln,font=lf,fill=INK2); yy+=30
    # buttons
    yy+=24
    b1=F(18); t1='Получить коммерческое предложение'
    w1=d.textlength(t1,font=b1)+48
    rrect(d,(lx,yy,lx+w1,yy+56),28,fill=ACC)
    d.text((lx+24,yy+17),t1,font=b1,fill=(255,255,255))
    t2='Смотреть продукцию'; w2=d.textlength(t2,font=b1)+48
    bx=lx+w1+16
    rrect(d,(bx,yy,bx+w2,yy+56),28,fill=(255,255,255),outline=LINE,width=1)
    d.text((bx+24,yy+17),t2,font=b1,fill=INK)
    return img,d,(820,200,1530,830)  # stage box

def paste_stage(img, stage_arr, box, radius=26, border=LINE):
    x0,y0,x1,y1=box; w,h=x1-x0,y1-y0
    s=Image.fromarray(np.clip(stage_arr,0,255).astype('uint8'),'RGB').resize((w,h))
    mask=Image.new('L',(w,h),0); ImageDraw.Draw(mask).rounded_rectangle((0,0,w-1,h-1),radius,fill=255)
    img.paste(s,(x0,y0),mask)
    ImageDraw.Draw(img).rounded_rectangle(box,radius,outline=border,width=1)

# ================= VARIANT 1 — engine =================
def draw_genset(d, ox, oy, sc):
    def X(v): return ox+v*sc
    def Y(v): return oy+v*sc
    def rr(b,r,f): d.rounded_rectangle([X(b[0]),Y(b[1]),X(b[2]),Y(b[3])],radius=r*sc,fill=f)
    steel=(196,201,208); steelD=(45,49,55); mid=(154,160,168); dark=(23,26,30)
    # shadow
    d.ellipse([X(100),Y(485),X(860),Y(515)],fill=(14,17,22,40))
    rr((90,430,870,488),8,steelD)             # skid
    rr((90,430,870,436),3,ACC)                # red stripe
    rr((140,486,210,500),3,dark); rr((750,486,820,500),3,dark)
    rr((96,250,216,436),10,steelD)            # radiator
    for i in range(11): rr((106,262+i*16,206,269+i*16),3,(74,79,87))
    rr((232,300,612,436),10,steel)            # block
    for i in range(19): d.ellipse([X(252+i*19)-3,Y(412)-3,X(252+i*19)+3,Y(412)+3],fill=(108,114,124))
    rr((250,252,594,304),8,(215,219,224))     # valve cover base
    for i in range(6): rr((262+i*56,244,306+i*56,266),5,steel)
    rr((250,306,594,322),8,ACC)               # intake
    rr((258,222,574,236),7,(90,96,105))       # exhaust
    rr((612,316,658,420),8,steelD)            # flywheel
    d.ellipse([X(656)-160,Y(300),X(656)+34,Y(436)],fill=steel)  # alternator approx
    rr((656,300,846,436),20,steel)
    d.ellipse([X(824),Y(300),X(868),Y(436)],fill=(215,219,224)) # cap
    for i in range(7): rr((686+i*20,320,692+i*20,416),3,(126,132,141))
    d.ellipse([X(721),Y(338),X(781),Y(398)],fill=(255,255,255),outline=ACC,width=int(4*sc))
    fl=flame(int(40*sc)); d._image.paste(fl,(int(X(731)),int(Y(346)) ),fl)
    rr((232,356,296,436),6,steelD)            # control box
    rr((242,368,286,398),3,(14,17,22))
    rr((246,372,282,381),2,ACC)

def variant1():
    img,d,box=base()
    x0,y0,x1,y1=box; w,h=x1-x0,y1-y0
    stage=vgrad(w,h,(255,255,255),(233,236,241))
    paste_stage(img,stage,box)
    d=ImageDraw.Draw(img,'RGBA')
    draw_genset(d, x0+30, y0-40, (w-60)/960.0*1.0)
    # embers
    rng=np.random.default_rng(7)
    for _ in range(60):
        ex=x0+120+rng.random()*(w-260); ey=y0+120+rng.random()*(h-260)
        r=2+rng.random()*3; a=int(120+rng.random()*120)
        d.ellipse([ex-r,ey-r,ex+r,ey+r],fill=(255,100,44,a))
    # badge
    rrect(d,(x0+20,y0+20,x0+220,y0+58),19,fill=(255,255,255),outline=LINE)
    d.ellipse([x0+34,y0+34,x0+44,y0+44],fill=(31,157,87))
    d.text((x0+52,y0+30),'Двигатель в работе',font=F(15),fill=ACC)
    label(d,'Вариант 1 · «Живой двигатель» — интерактивная 3D-модель ГПУ (three.js)')
    img.save(os.path.join(OUT,'variant-1.png')); print('variant-1.png')

# ================= VARIANT 2 — flame =================
def variant2():
    img,d,box=base('для развития')
    x0,y0,x1,y1=box; w,h=x1-x0,y1-y0
    # dark stage base
    base_arr=vgrad(w,h,(18,11,10),(10,7,8))
    # radial bottom warmth
    yy,xx=np.mgrid[0:h,0:w]; cx,cy=w/2,h*1.05
    dist=np.sqrt((xx-cx)**2+(yy-cy)**2)/(w*0.7)
    warm=np.clip(1-dist,0,1)[...,None]**2
    base_arr=base_arr+np.array([60,26,18])[None,None,:]*warm
    # additive particle flame (steady-state snapshot)
    flame_buf=np.zeros((h,w,3))
    rng=np.random.default_rng(3)
    def tint(t):
        if t<0.22: return np.array([255,246,220])
        if t<0.5:  return np.array([255,196,92])
        if t<0.76: return np.array([255,108,46])
        return np.array([206,38,34])
    N=2200
    for _ in range(N):
        u=rng.random(); t=u**1.4               # height param (0 bottom .. 1 top)
        py=h*0.92 - t*h*0.8
        spread=(w*0.16)*(1-t*0.7)
        px=w*0.5 + rng.normal(0,spread*0.45) + math.sin(t*6)*spread*0.15
        rad=(min(w,h)/16)*(0.5+0.9*(1-t))
        col=tint(t)*(0.9*(1-t)+0.15)
        x0i=max(0,int(px-rad)); x1i=min(w,int(px+rad))
        y0i=max(0,int(py-rad)); y1i=min(h,int(py+rad))
        if x1i<=x0i or y1i<=y0i: continue
        gy,gx=np.mgrid[y0i:y1i,x0i:x1i]
        dd=((gx-px)**2+(gy-py)**2)/(rad*rad)
        fall=np.exp(-dd*2.2)[...,None]
        flame_buf[y0i:y1i,x0i:x1i]+=col[None,None,:]*fall*0.5
    arr=base_arr+flame_buf
    paste_stage(img,arr,box,border=(32,36,43))
    d=ImageDraw.Draw(img,'RGBA')
    # live tag
    d.ellipse([x0+22,y0+24,x0+32,y0+34],fill=(255,106,61))
    tracked(d,(x0+42,y0+22),'ЖИВАЯ ЭНЕРГИЯ',F(14),(255,203,184),spacing=4)
    # caption
    cap='ЭЛЕМЕНТ'; cf=F(26)
    cw=sum(d.textlength(c,font=cf)+8 for c in cap)
    tracked(d,(x0+(w-cw)/2,y1-90),cap,cf,(255,255,255),spacing=8)
    sub='Каждый киловатт рождается из управляемого огня'; sf=F(16,False)
    d.text((x0+(w-d.textlength(sub,font=sf))/2,y1-52),sub,font=sf,fill=(200,144,127))
    label(d,'Вариант 2 · «Кинетическое пламя» — живое пламя из частиц (canvas)')
    img.save(os.path.join(OUT,'variant-2.png')); print('variant-2.png')

# ================= VARIANT 3 — energy wave =================
def variant3():
    img,d,box=base('для развития')
    x0,y0,x1,y1=box; w,h=x1-x0,y1-y0
    stage=Image.new('RGB',(w,h),(255,255,255))
    sd=ImageDraw.Draw(stage)
    for gx in range(0,w,max(40,w//14)): sd.line([(gx,0),(gx,h)],fill=(238,240,243))
    for gy in range(0,h,max(40,h//8)): sd.line([(0,gy),(w,gy)],fill=(238,240,243))
    midY=h*0.62; amp=h*0.16; ph=1.2
    def yat(x):
        t=x/w*math.pi*2
        return midY-(math.sin(t*2+ph)*amp+math.sin(t*5+ph*1.7)*amp*0.28+math.sin(t*9+ph*0.6)*amp*0.12)
    pts=[(x,yat(x)) for x in range(0,w,3)]
    # fill under curve
    poly=[(0,h)]+pts+[(w,h)]
    fillmask=Image.new('L',(w,h),0); ImageDraw.Draw(fillmask).polygon(poly,fill=255)
    grad=to_img(vgrad(w,h,(247,206,209),(255,255,255)))
    stage.paste(grad,(0,0),fillmask)
    # glow line
    glow=Image.new('RGB',(w,h),(0,0,0)); gd=ImageDraw.Draw(glow)
    gd.line(pts,fill=(225,29,42),width=7,joint='curve')
    glow=glow.filter(ImageFilter.GaussianBlur(8))
    stage=Image.fromarray(np.clip(np.array(stage).astype(float)+np.array(glow).astype(float)*0.9,0,255).astype('uint8'))
    sd=ImageDraw.Draw(stage)
    sd.line(pts,fill=(225,29,42),width=4,joint='curve')
    px,py=w-8,yat(w-8); sd.ellipse([px-6,py-6,px+6,py+6],fill=(225,29,42))
    paste_stage(img,np.array(stage).astype(float),box)
    d=ImageDraw.Draw(img,'RGBA')
    # readout
    d.text((x0+26,y0+22),'ТЕКУЩАЯ ВЫРАБОТКА',font=F(14),fill=MUT)
    d.text((x0+24,y0+44),'218',font=F(64),fill=INK)
    d.text((x0+24+d.textlength('218',font=F(64))+10,y0+78),'кВт',font=F(26),fill=ACC)
    rrect(d,(x0+26,y0+128,x0+232,y0+162),17,fill=(233,247,239))
    d.ellipse([x0+40,y0+139,x0+50,y0+149],fill=(31,157,87))
    d.text((x0+58,y0+136),'УСТАНОВКА В РАБОТЕ',font=F(13),fill=(31,157,87))
    # chips
    chips=[('50.0','Частота, Гц'),('0.40','Напряжение, кВ'),('43%','Электр. КПД')]
    cx=x0+26
    for val,lab in chips:
        cw=120
        rrect(d,(cx,y1-92,cx+cw,y1-26),12,fill=BG2,outline=LINE)
        d.text((cx+14,y1-84),val,font=F(20),fill=INK)
        d.text((cx+14,y1-54),lab,font=F(12,False),fill=MUT)
        cx+=cw+12
    label(d,'Вариант 3 · «Поток энергии» — волна мощности + счётчик кВт в реальном времени')
    img.save(os.path.join(OUT,'variant-3.png')); print('variant-3.png')

def label(d,text):
    d.rectangle([0,H-40,W,H],fill=(14,17,22))
    d.text((70,H-31),text,font=F(15,False),fill=(230,230,232))

if __name__=='__main__':
    variant1(); variant2(); variant3()
    print('done ->', OUT)
