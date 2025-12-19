import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const ageGroups = [
  {
    range: '1.5-3 года',
    emoji: '👶',
    duration: 10,
    description: 'Ясельный возраст. Занятия проходят в игровой форме с частыми переменами активности.',
    features: ['Короткие занятия', 'Игровая форма', 'Частые перерывы']
  },
  {
    range: '3-4 года',
    emoji: '🧒',
    duration: 15,
    description: 'Младший дошкольный возраст. Дети учатся концентрировать внимание на более длительное время.',
    features: ['Развитие внимания', 'Творческие задания', 'Социализация']
  },
  {
    range: '4-5 лет',
    emoji: '👦',
    duration: 20,
    description: 'Средний дошкольный возраст. Активное развитие познавательных способностей.',
    features: ['Познавательная активность', 'Развитие речи', 'Творчество']
  },
  {
    range: '5-6 лет',
    emoji: '🧑',
    duration: 25,
    description: 'Старший дошкольный возраст. Подготовка к школьному обучению.',
    features: ['Подготовка к школе', 'Развитие усидчивости', 'Базовые навыки']
  },
  {
    range: '6-7 лет',
    emoji: '👨',
    duration: 30,
    description: 'Предшкольный и начало школьного возраста. Адаптация к учебному процессу.',
    features: ['Школьная адаптация', 'Учебные навыки', 'Дисциплина']
  },
  {
    range: '7-18 лет',
    emoji: '🎓',
    duration: 45,
    description: 'Школьный возраст. Полноценный академический час для всех классов школы.',
    features: ['Школьная программа', 'Углубленное обучение', 'Профориентация']
  }
];

export default function Index() {
  const [regularHours, setRegularHours] = useState<number>(60);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<number>(3);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const academicHours = Math.round((regularHours / ageGroups[selectedAgeGroup].duration) * 10) / 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Сообщение отправлено! 📧',
      description: 'Мы свяжемся с вами в ближайшее время.',
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 font-rubik">
            ⏰ Калькулятор академических часов
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Рассчитайте академические часы с учётом возрастных особенностей детей от 1.5 до 18 лет
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="animate-scale-in shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-primary/5 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="Calculator" size={28} className="text-primary" />
                Калькулятор
              </CardTitle>
              <CardDescription>Введите обычные часы и выберите возрастную группу</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="hours" className="text-base font-medium mb-2 block">
                    Обычные часы (минуты):
                  </Label>
                  <div className="flex gap-3 items-center">
                    <Input
                      id="hours"
                      type="number"
                      value={regularHours}
                      onChange={(e) => setRegularHours(Number(e.target.value))}
                      min="1"
                      max="300"
                      className="text-lg"
                    />
                    <span className="text-muted-foreground whitespace-nowrap">мин</span>
                  </div>
                  <Slider
                    value={[regularHours]}
                    onValueChange={(value) => setRegularHours(value[0])}
                    min={10}
                    max={300}
                    step={5}
                    className="mt-4"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Выберите возрастную группу:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {ageGroups.map((group, index) => (
                      <Button
                        key={index}
                        variant={selectedAgeGroup === index ? 'default' : 'outline'}
                        onClick={() => setSelectedAgeGroup(index)}
                        className="h-auto py-3 flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                      >
                        <span className="text-2xl">{group.emoji}</span>
                        <span className="text-xs font-medium">{group.range}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 text-center border-2 border-primary/20">
                  <div className="text-sm text-muted-foreground mb-2">Результат:</div>
                  <div className="text-5xl font-bold text-primary font-rubik mb-2">
                    {academicHours}
                  </div>
                  <div className="text-lg text-foreground">
                    академических часов
                  </div>
                  <div className="text-sm text-muted-foreground mt-3">
                    {ageGroups[selectedAgeGroup].emoji} {regularHours} мин = {academicHours} × {ageGroups[selectedAgeGroup].duration} мин
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 animate-fade-in">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-secondary/5 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Users" size={28} className="text-secondary" />
                  {ageGroups[selectedAgeGroup].emoji} {ageGroups[selectedAgeGroup].range}
                </CardTitle>
                <CardDescription>Академический час: {ageGroups[selectedAgeGroup].duration} минут</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-foreground mb-4">{ageGroups[selectedAgeGroup].description}</p>
                <div className="space-y-2">
                  {ageGroups[selectedAgeGroup].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={18} className="text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-accent/50 to-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Icon name="Info" size={24} className="text-primary animate-bounce-soft" />
                  Что такое академический час?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">
                  Академический час — это единица измерения учебного времени, которая адаптируется под возрастные особенности детей. 
                  Для младших детей это короткие периоды концентрации внимания, для старших — полноценные учебные занятия.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-12 shadow-lg animate-scale-in">
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Icon name="BookOpen" size={28} className="text-primary" />
              Возрастные группы и стандарты
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {ageGroups.map((group, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{group.emoji}</span>
                      <div>
                        <div className="font-semibold text-lg">{group.range}</div>
                        <div className="text-sm text-muted-foreground">
                          Академический час: {group.duration} минут
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-12 pt-2 space-y-3">
                      <p className="text-foreground">{group.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="shadow-lg animate-fade-in">
          <CardHeader className="bg-secondary/5">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Icon name="MessageSquare" size={28} className="text-secondary" />
              Свяжитесь с нами
            </CardTitle>
            <CardDescription>
              Есть вопросы? Напишите нам, и мы с радостью поможем!
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Сообщение</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Расскажите, чем мы можем помочь..."
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Icon name="Send" size={18} className="mr-2" />
                Отправить сообщение
              </Button>
            </form>
          </CardContent>
        </Card>

        <footer className="mt-12 text-center text-muted-foreground animate-fade-in">
          <p className="text-sm">
            © 2024 Калькулятор академических часов | Создано для помощи педагогам и родителям
          </p>
        </footer>
      </div>
    </div>
  );
}