import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const LOGO = 'https://cdn.poehali.dev/projects/b1a1a51c-7142-4499-a425-7a2bc2d7e1e7/bucket/98fdd252-fd13-4df4-9b1e-3eaa1f2548c9.jpeg';
const HERO = 'https://cdn.poehali.dev/projects/b1a1a51c-7142-4499-a425-7a2bc2d7e1e7/files/8c945aaf-63a8-4eb6-93fb-c1b01790d488.jpg';
const SEAFOOD = 'https://cdn.poehali.dev/projects/b1a1a51c-7142-4499-a425-7a2bc2d7e1e7/files/7b887861-ccd7-44c6-803e-e6bb7cd003c9.jpg';

type Dish = { id: string; name: string; desc: string; price: number; cat: string };

const CATEGORIES = [
  { id: 'meat', name: 'Мясо', icon: 'Beef' },
  { id: 'fish', name: 'Рыба', icon: 'Fish' },
  { id: 'shrimp', name: 'Тигровые креветки', icon: 'Shrimp' },
  { id: 'burger', name: 'Бургеры на мангале', icon: 'Sandwich' },
  { id: 'salad', name: 'Салаты', icon: 'Salad' },
  { id: 'drinks', name: 'Напитки', icon: 'CupSoda' },
  { id: 'tea', name: 'Чай', icon: 'Leaf' },
  { id: 'coffee', name: 'Кофе', icon: 'Coffee' },
];

const DISHES: Dish[] = [
  { id: '1', cat: 'meat', name: 'Шашлык из баранины', desc: 'Сочная вырезка на углях, лук маринованный', price: 590 },
  { id: '2', cat: 'meat', name: 'Шашлык из свинины', desc: 'Шейка в фирменном маринаде', price: 450 },
  { id: '3', cat: 'meat', name: 'Люля-кебаб', desc: 'Рубленая телятина с зеленью', price: 420 },
  { id: '4', cat: 'fish', name: 'Стейк из лосося', desc: 'На мангале с лимоном и травами', price: 690 },
  { id: '5', cat: 'fish', name: 'Дорадо на гриле', desc: 'Целиком, с прованскими травами', price: 650 },
  { id: '6', cat: 'shrimp', name: 'Тигровые креветки', desc: '6 шт на углях, чесночный соус', price: 790 },
  { id: '7', cat: 'shrimp', name: 'Креветки в остром соусе', desc: 'Пикантные, с лаймом', price: 820 },
  { id: '8', cat: 'burger', name: 'Гриль-бургер «Веранда»', desc: 'Котлета на углях, сыр, бекон', price: 480 },
  { id: '9', cat: 'burger', name: 'Чикен-бургер', desc: 'Куриное филе на мангале', price: 390 },
  { id: '10', cat: 'salad', name: 'Овощи гриль', desc: 'Запечённые на углях баклажан, перец, цукини', price: 320 },
  { id: '11', cat: 'salad', name: 'Цезарь с курицей', desc: 'Классический, с гриль-курицей', price: 360 },
  { id: '12', cat: 'drinks', name: 'Лимонад домашний', desc: 'Свежий, 0.5 л', price: 220 },
  { id: '13', cat: 'drinks', name: 'Морс ягодный', desc: 'Без сахара, 0.5 л', price: 180 },
  { id: '14', cat: 'tea', name: 'Чай травяной', desc: 'Чабрец, мята, чайник 0.7 л', price: 290 },
  { id: '15', cat: 'tea', name: 'Чёрный чай', desc: 'Классический, чайник 0.7 л', price: 240 },
  { id: '16', cat: 'coffee', name: 'Капучино', desc: 'На зёрнах свежей обжарки', price: 200 },
  { id: '17', cat: 'coffee', name: 'Эспрессо', desc: 'Двойной, насыщенный', price: 150 },
];

const Index = () => {
  const [activeCat, setActiveCat] = useState('meat');
  const [cart, setCart] = useState<Record<string, number>>({});

  const filtered = useMemo(() => DISHES.filter((d) => d.cat === activeCat), [activeCat]);
  const cartItems = useMemo(
    () => DISHES.filter((d) => cart[d.id]).map((d) => ({ ...d, qty: cart[d.id] })),
    [cart]
  );
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cartItems.reduce((s, i) => s + i.qty, 0);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id: string) =>
    setCart((c) => {
      const n = { ...c };
      if (n[id] > 1) n[id] -= 1;
      else delete n[id];
      return n;
    });

  const checkout = () => {
    if (!count) return;
    toast({ title: 'Заказ оформлен!', description: `${count} поз. на ${total} ₽. Мы свяжемся с вами по телефону.` });
    setCart({});
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const socials = [
    { icon: 'Instagram', label: 'Instagram', href: '#' },
    { icon: 'Send', label: 'Telegram', href: '#' },
    { icon: 'AtSign', label: 'Threads', href: '#' },
    { icon: 'MessageCircle', label: 'MAX', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-2">
            <img src={LOGO} alt="Веранда Гриль" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-display font-bold tracking-wide text-lg">ВЕРАНДА ГРИЛЬ</span>
          </button>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button onClick={() => scrollTo('menu')} className="hover:text-primary transition-colors">Меню</button>
            <button onClick={() => scrollTo('order')} className="hover:text-primary transition-colors">Заказ</button>
            <button onClick={() => scrollTo('contacts')} className="hover:text-primary transition-colors">Контакты</button>
          </nav>
          <Button onClick={() => scrollTo('order')} className="relative bg-primary text-primary-foreground hover:bg-accent font-semibold">
            <Icon name="ShoppingBag" size={18} />
            <span className="ml-1.5">{total ? `${total} ₽` : 'Корзина'}</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <img src={HERO} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="container relative z-10">
          <div className="max-w-xl animate-fade-up">
            <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold tracking-widest uppercase mb-5">
              <Icon name="Flame" size={18} className="animate-flicker" /> Приготовлено на мангале
            </span>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-5">
              ВКУС <span className="fire-text">ЖИВОГО ОГНЯ</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Мясо, рыба, тигровые креветки и бургеры на углях. Свежие салаты, ароматный чай и кофе. Заказывайте онлайн — приготовим с дымком.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => scrollTo('menu')} size="lg" className="bg-primary text-primary-foreground hover:bg-accent font-semibold fire-glow">
                <Icon name="UtensilsCrossed" size={20} className="mr-2" /> Смотреть меню
              </Button>
              <Button onClick={() => scrollTo('contacts')} size="lg" variant="outline" className="border-border bg-background/40 hover:bg-secondary font-semibold">
                <Icon name="Phone" size={20} className="mr-2" /> 8 918 255 06 66
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="smoke-bg py-20">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Наше меню</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl mt-2">ВЫБИРАЙТЕ И ЗАКАЗЫВАЙТЕ</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCat === c.id
                    ? 'bg-primary text-primary-foreground fire-glow'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
              >
                <Icon name={c.icon} size={16} fallback="Utensils" />
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d) => (
              <div key={d.id} className="group bg-card border border-border rounded-2xl p-5 flex flex-col hover:border-primary/60 transition-all">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="font-display font-semibold text-xl leading-tight">{d.name}</h3>
                    <span className="fire-text font-display font-bold text-xl whitespace-nowrap">{d.price} ₽</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{d.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  {cart[d.id] ? (
                    <div className="flex items-center gap-3">
                      <button onClick={() => remove(d.id)} className="h-9 w-9 rounded-full bg-secondary hover:bg-muted flex items-center justify-center">
                        <Icon name="Minus" size={16} />
                      </button>
                      <span className="font-bold w-5 text-center">{cart[d.id]}</span>
                      <button onClick={() => add(d.id)} className="h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-accent flex items-center justify-center">
                        <Icon name="Plus" size={16} />
                      </button>
                    </div>
                  ) : (
                    <Button onClick={() => add(d.id)} className="bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground font-semibold w-full">
                      <Icon name="Plus" size={16} className="mr-1.5" /> В корзину
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="py-20 relative overflow-hidden">
        <img src={SEAFOOD} alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-3xl p-7 sm:p-9">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="ShoppingBag" size={28} className="text-primary" />
              <h2 className="font-display font-bold text-3xl">Ваш заказ</h2>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <Icon name="UtensilsCrossed" size={48} className="mx-auto mb-3 opacity-50" />
                <p>Корзина пуста. Выберите блюда из меню.</p>
                <Button onClick={() => scrollTo('menu')} variant="outline" className="mt-5 border-border hover:bg-secondary">
                  Перейти к меню
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cartItems.map((i) => (
                    <div key={i.id} className="flex items-center justify-between gap-3 py-3 border-b border-border last:border-0">
                      <div>
                        <p className="font-semibold">{i.name}</p>
                        <p className="text-sm text-muted-foreground">{i.price} ₽ × {i.qty}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => remove(i.id)} className="h-8 w-8 rounded-full bg-secondary hover:bg-muted flex items-center justify-center">
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="font-bold w-5 text-center">{i.qty}</span>
                        <button onClick={() => add(i.id)} className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-accent flex items-center justify-center">
                          <Icon name="Plus" size={14} />
                        </button>
                        <span className="fire-text font-display font-bold w-20 text-right">{i.price * i.qty} ₽</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold">Итого</span>
                  <span className="fire-text font-display font-bold text-3xl">{total} ₽</span>
                </div>
                <Button onClick={checkout} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-accent font-bold text-lg fire-glow">
                  <Icon name="Flame" size={20} className="mr-2" /> Оформить заказ
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="smoke-bg py-20 border-t border-border">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Контакты</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl mt-2">ЖДЁМ В ГОСТИ</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { icon: 'MapPin', title: 'Адрес', value: 'г. Краснодар, ул. Веранды, 12' },
              { icon: 'Phone', title: 'Телефон', value: '8 918 255 06 66' },
              { icon: 'Mail', title: 'Почта', value: 'info@veranda-grill.ru' },
            ].map((c) => (
              <div key={c.title} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-3">
                  <Icon name={c.icon} size={22} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{c.title}</p>
                <p className="font-semibold">{c.value}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="h-12 w-12 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
                title={s.label}
              >
                <Icon name={s.icon} size={22} fallback="Link" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={LOGO} alt="" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-display font-bold tracking-wide">ВЕРАНДА ГРИЛЬ</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Веранда Гриль. Вкус живого огня.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
