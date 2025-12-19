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
    description: 'Ясельный возраст. Занятия в дополнительном образовании проходят в игровой форме с частыми переменами активности.',
    features: ['Короткие занятия', 'Игровая форма', 'Частые перерывы']
  },
  {
    range: '3-4 года',
    emoji: '🧒',
    duration: 15,
    description: 'Младший дошкольный возраст. Дети в кружках и секциях учатся концентрировать внимание на более длительное время.',
    features: ['Развитие внимания', 'Творческие задания', 'Социализация']
  },
  {
    range: '4-5 лет',
    emoji: '👦',
    duration: 20,
    description: 'Средний дошкольный возраст. Активное развитие познавательных способностей в студиях и секциях.',
    features: ['Познавательная активность', 'Развитие речи', 'Творчество']
  },
  {
    range: '5-6 лет',
    emoji: '🧑',
    duration: 25,
    description: 'Старший дошкольный возраст. Подготовительные программы в центрах дополнительного образования.',
    features: ['Подготовка к школе', 'Развитие усидчивости', 'Базовые навыки']
  },
  {
    range: '6-7 лет',
    emoji: '👨',
    duration: 30,
    description: 'Предшкольный возраст. Адаптация к структурированным занятиям в кружках и секциях.',
    features: ['Учебные навыки', 'Дисциплина', 'Групповая работа']
  },
  {
    range: '7-18 лет',
    emoji: '🎓',
    duration: 45,
    description: 'Школьный возраст. Полноценный академический час для программ дополнительного образования.',
    features: ['Профильные курсы', 'Углубленное обучение', 'Профориентация']
  }
];

export default function Index() {
  const [mode, setMode] = useState<'toAcademic' | 'toRegular'>('toAcademic');
  const [inputHours, setInputHours] = useState<number>(1);
  const [inputMinutes, setInputMinutes] = useState<number>(0);
  const [academicInput, setAcademicInput] = useState<number>(2);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<number>(3);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const totalMinutes = inputHours * 60 + inputMinutes;
  const academicHours = Math.round((totalMinutes / ageGroups[selectedAgeGroup].duration) * 10) / 10;
  const regularMinutes = Math.round(academicInput * ageGroups[selectedAgeGroup].duration);
  const regularHours = Math.floor(regularMinutes / 60);
  const regularMins = regularMinutes % 60;

  const getProgramLevel = (hours: number) => {
    if (hours < 16) return { level: 'Ознакомительный уровень', range: 'до 16 ак.ч.', color: 'bg-blue-100 text-blue-700 border-blue-300', emoji: '🔍', description: 'Краткое знакомство с направлением' };
    if (hours < 36) return { level: 'Ознакомительный уровень', range: '16-36 ак.ч.', color: 'bg-blue-100 text-blue-700 border-blue-300', emoji: '🔍', description: 'Первичное освоение основ' };
    if (hours < 72) return { level: 'Базовый уровень', range: '36-72 ак.ч.', color: 'bg-green-100 text-green-700 border-green-300', emoji: '📚', description: 'Системное изучение предмета' };
    if (hours < 144) return { level: 'Углублённый уровень', range: '72-144 ак.ч.', color: 'bg-purple-100 text-purple-700 border-purple-300', emoji: '🎯', description: 'Глубокое изучение с практикой' };
    if (hours < 288) return { level: 'Профильный уровень', range: '144-288 ак.ч.', color: 'bg-orange-100 text-orange-700 border-orange-300', emoji: '🏆', description: 'Профессиональная подготовка' };
    return { level: 'Продвинутый уровень', range: '288+ ак.ч.', color: 'bg-red-100 text-red-700 border-red-300', emoji: '⭐', description: 'Экспертное мастерство' };
  };

  const currentProgram = getProgramLevel(academicHours);

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
            Рассчитайте академические часы для программ дополнительного образования с учётом возрастных особенностей детей от 1.5 до 18 лет
          </p>
        </header>

        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex rounded-lg border border-border bg-muted p-1">
            <Button
              variant={mode === 'toAcademic' ? 'default' : 'ghost'}
              onClick={() => setMode('toAcademic')}
              className="rounded-md"
            >
              <Icon name="ArrowRight" size={18} className="mr-2" />
              Обычные → Академические
            </Button>
            <Button
              variant={mode === 'toRegular' ? 'default' : 'ghost'}
              onClick={() => setMode('toRegular')}
              className="rounded-md"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Академические → Обычные
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="animate-scale-in shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-primary/5 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="Calculator" size={28} className="text-primary" />
                {mode === 'toAcademic' ? 'Обычные → Академические' : 'Академические → Обычные'}
              </CardTitle>
              <CardDescription>
                {mode === 'toAcademic' 
                  ? 'Введите обычные часы и выберите возрастную группу' 
                  : 'Введите академические часы и выберите возрастную группу'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {mode === 'toAcademic' ? (
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Введите обычное время:
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="hours" className="text-sm text-muted-foreground mb-2 block">
                          Часы
                        </Label>
                        <div className="flex gap-2 items-center">
                          <Input
                            id="hours"
                            type="number"
                            value={inputHours}
                            onChange={(e) => setInputHours(Math.max(0, Number(e.target.value)))}
                            min="0"
                            max="10"
                            className="text-lg"
                          />
                          <span className="text-muted-foreground whitespace-nowrap text-sm">ч</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="minutes" className="text-sm text-muted-foreground mb-2 block">
                          Минуты
                        </Label>
                        <div className="flex gap-2 items-center">
                          <Input
                            id="minutes"
                            type="number"
                            value={inputMinutes}
                            onChange={(e) => setInputMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
                            min="0"
                            max="59"
                            className="text-lg"
                          />
                          <span className="text-muted-foreground whitespace-nowrap text-sm">мин</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      Всего: <span className="font-semibold text-foreground">{totalMinutes}</span> минут
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="academic" className="text-base font-medium mb-3 block">
                      Введите академические часы:
                    </Label>
                    <Input
                      id="academic"
                      type="number"
                      value={academicInput}
                      onChange={(e) => setAcademicInput(Math.max(0, Number(e.target.value)))}
                      min="0"
                      step="0.1"
                      className="text-lg"
                    />
                  </div>
                )}

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
                  {mode === 'toAcademic' ? (
                    <>
                      <div className="text-5xl font-bold text-primary font-rubik mb-2">
                        {academicHours}
                      </div>
                      <div className="text-lg text-foreground">
                        академических часов
                      </div>
                      <div className="text-sm text-muted-foreground mt-3">
                        {ageGroups[selectedAgeGroup].emoji} {totalMinutes} мин = {academicHours} × {ageGroups[selectedAgeGroup].duration} мин
                      </div>
                      
                      {academicHours >= 16 && (
                        <div className={`mt-4 p-3 rounded-lg border-2 ${currentProgram.color}`}>
                          <div className="text-2xl mb-1">{currentProgram.emoji}</div>
                          <div className="font-bold text-sm mb-1">{currentProgram.level}</div>
                          <div className="text-xs opacity-80 mb-1">{currentProgram.range}</div>
                          <div className="text-xs opacity-90">{currentProgram.description}</div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="text-5xl font-bold text-primary font-rubik mb-2">
                        {regularHours > 0 ? `${regularHours}ч ` : ''}{regularMins}м
                      </div>
                      <div className="text-lg text-foreground">
                        обычного времени
                      </div>
                      <div className="text-sm text-muted-foreground mt-3">
                        {ageGroups[selectedAgeGroup].emoji} {academicInput} ак.ч × {ageGroups[selectedAgeGroup].duration} мин = {regularMinutes} мин
                      </div>
                    </>
                  )}
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
                  Академический час в дополнительном образовании — это единица измерения учебного времени, которая адаптируется под возрастные особенности детей. 
                  Для младших детей это короткие периоды концентрации внимания в кружках и студиях, для старших — полноценные занятия в секциях и образовательных центрах.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg animate-scale-in">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="BookOpen" size={28} className="text-primary" />
                Возрастные группы
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

          <Card className="shadow-lg animate-scale-in">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="GraduationCap" size={28} className="text-primary" />
                Уровни программ
              </CardTitle>
              <CardDescription>
                Классификация по объёму академических часов
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              {[
                { level: 'Ознакомительный', range: '16-36 ак.ч.', emoji: '🔍', color: 'bg-blue-100 text-blue-700 border-blue-300', desc: 'Первичное освоение основ' },
                { level: 'Базовый', range: '36-72 ак.ч.', emoji: '📚', color: 'bg-green-100 text-green-700 border-green-300', desc: 'Системное изучение предмета' },
                { level: 'Углублённый', range: '72-144 ак.ч.', emoji: '🎯', color: 'bg-purple-100 text-purple-700 border-purple-300', desc: 'Глубокое изучение с практикой' },
                { level: 'Профильный', range: '144-288 ак.ч.', emoji: '🏆', color: 'bg-orange-100 text-orange-700 border-orange-300', desc: 'Профессиональная подготовка' },
                { level: 'Продвинутый', range: '288+ ак.ч.', emoji: '⭐', color: 'bg-red-100 text-red-700 border-red-300', desc: 'Экспертное мастерство' }
              ].map((prog, idx) => (
                <div key={idx} className={`p-4 rounded-lg border-2 ${prog.color}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{prog.emoji}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm mb-1">{prog.level}</div>
                      <div className="text-xs opacity-80 mb-1">{prog.range}</div>
                      <div className="text-xs opacity-90">{prog.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

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
            © 2024 Калькулятор академических часов | Создано для педагогов дополнительного образования и родителей
          </p>
        </footer>
      </div>
    </div>
  );
}