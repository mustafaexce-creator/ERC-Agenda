import React, { useState, useMemo } from 'react';
import { 
  Search, Calendar, HeartHandshake, Stethoscope, 
  Globe, Flag, AlertTriangle, Users, Activity, 
  Baby, ShieldAlert, Droplets, HeartPulse
} from 'lucide-react';

// --- البيانات المجمعة للأجندة ---
const eventsData = [
  { id: 1, day: '31', month: 'مايو', monthNum: 5, weekday: 'الأحد', title: 'اليوم العالمي للامتناع عن التدخين', category: 'صحة', icon: Activity },
  { id: 2, day: '14', month: 'يونيو', monthNum: 6, weekday: 'الأحد', title: 'اليوم العالمي للمتبرعين بالدم', category: 'صحة', icon: Droplets },
  { id: 3, day: '28', month: 'يوليو', monthNum: 7, weekday: 'الثلاثاء', title: 'اليوم العالمي لالتهاب الكبد', category: 'صحة', icon: Activity },
  { id: 4, day: '30', month: 'يوليو', monthNum: 7, weekday: 'الخميس', title: 'اليوم العالمي للصداقة', category: 'إنساني', icon: Users },
  { id: 5, day: '1-7', month: 'أغسطس', monthNum: 8, weekday: 'السبت - الجمعة', title: 'الأسبوع العالمي للرضاعة الطبيعية', category: 'صحة', icon: Baby },
  { id: 6, day: '12', month: 'أغسطس', monthNum: 8, weekday: 'الأربعاء', title: 'اليوم العالمي للشباب', category: 'إنساني', icon: Users },
  { id: 7, day: '19', month: 'أغسطس', monthNum: 8, weekday: 'الأربعاء', title: 'اليوم العالمي للعمل الإنساني', category: 'إنساني', icon: HeartHandshake },
  { id: 8, day: '5', month: 'سبتمبر', monthNum: 9, weekday: 'السبت', title: 'اليوم الدولي للعمل الخيري', category: 'إنساني', icon: HeartHandshake },
  { id: 9, day: '12', month: 'سبتمبر', monthNum: 9, weekday: 'السبت', title: 'اليوم العالمي للإسعافات الأولية', category: 'إسعافات', icon: Stethoscope },
  { id: 10, day: '17', month: 'سبتمبر', monthNum: 9, weekday: 'الخميس', title: 'اليوم العالمي لسلامة المرضى', category: 'صحة', icon: ShieldAlert },
  { id: 11, day: '21', month: 'سبتمبر', monthNum: 9, weekday: 'الإثنين', title: 'اليوم الدولي للسلام', category: 'إنساني', icon: Globe },
  { id: 12, day: '23', month: 'سبتمبر', monthNum: 9, weekday: 'الأربعاء', title: 'اليوم الدولي للغات الإشارة', category: 'إنساني', icon: Users },
  { id: 13, day: '29', month: 'سبتمبر', monthNum: 9, weekday: 'الثلاثاء', title: 'اليوم العالمي للقلب', category: 'صحة', icon: HeartPulse },
  { id: 14, day: '1', month: 'أكتوبر', monthNum: 10, weekday: 'الخميس', title: 'اليوم الدولي لكبار السن', category: 'إنساني', icon: Users },
  { id: 15, day: '6', month: 'أكتوبر', monthNum: 10, weekday: 'الثلاثاء', title: 'انتصار 6 أكتوبر', category: 'وطني', icon: Flag },
  { id: 16, day: '10', month: 'أكتوبر', monthNum: 10, weekday: 'السبت', title: 'اليوم العالمي للصحة النفسية', category: 'صحة', icon: Activity },
  { id: 17, day: '13', month: 'أكتوبر', monthNum: 10, weekday: 'الثلاثاء', title: 'اليوم الدولي للحد من الكوارث', category: 'كوارث', icon: AlertTriangle },
  { id: 18, day: '20', month: 'أكتوبر', monthNum: 10, weekday: 'الثلاثاء', title: 'اليوم العالمي لهشاشة العظام', category: 'صحة', icon: Activity },
  { id: 19, day: '24', month: 'أكتوبر', monthNum: 10, weekday: 'السبت', title: 'اليوم العالمي لشلل الأطفال', category: 'صحة', icon: Baby },
  { id: 20, day: '28', month: 'أكتوبر', monthNum: 10, weekday: 'الأربعاء', title: 'ذكرى تأسيس الهلال الأحمر المصري', category: 'وطني', icon: Flag },
  { id: 21, day: '11', month: 'نوفمبر', monthNum: 11, weekday: 'الأربعاء', title: 'اليوم العالمي لأحمد غانم', category: 'خاص', icon: Calendar },
  { id: 22, day: '14', month: 'نوفمبر', monthNum: 11, weekday: 'السبت', title: 'اليوم العالمي للسكري', category: 'صحة', icon: Activity },
  { id: 23, day: '20', month: 'نوفمبر', monthNum: 11, weekday: 'الجمعة', title: 'اليوم العالمي للطفل', category: 'إنساني', icon: Baby },
  { id: 24, day: '1', month: 'ديسمبر', monthNum: 12, weekday: 'الثلاثاء', title: 'اليوم العالمي للإيدز', category: 'صحة', icon: Activity },
  { id: 25, day: '3', month: 'ديسمبر', monthNum: 12, weekday: 'الخميس', title: 'اليوم الدولي للأشخاص ذوي الإعاقة', category: 'إنساني', icon: Users },
  { id: 26, day: '5', month: 'ديسمبر', monthNum: 12, weekday: 'السبت', title: 'اليوم العالمي للتطوع', category: 'إنساني', icon: HeartHandshake },
  { id: 27, day: '10', month: 'ديسمبر', monthNum: 12, weekday: 'الخميس', title: 'اليوم العالمي لحقوق الإنسان', category: 'إنساني', icon: Globe },
  { id: 28, day: '12', month: 'ديسمبر', monthNum: 12, weekday: 'السبت', title: 'اليوم الدولي للحياد', category: 'إنساني', icon: Globe },
  { id: 29, day: '12', month: 'ديسمبر', monthNum: 12, weekday: 'السبت', title: 'اليوم العالمي للتغطية الصحية الشاملة', category: 'صحة', icon: Stethoscope },
  { id: 30, day: '18', month: 'ديسمبر', monthNum: 12, weekday: 'الجمعة', title: 'اليوم العالمي للمهاجرين', category: 'إنساني', icon: Globe },
  { id: 31, day: '20', month: 'ديسمبر', monthNum: 12, weekday: 'الأحد', title: 'اليوم الدولي للتضامن الإنساني', category: 'إنساني', icon: HeartHandshake },
];

const months = ['الكل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('الكل');

  // فلترة البيانات بناءً على البحث والشهر المختار
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            event.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMonth = selectedMonth === 'الكل' || event.month === selectedMonth;
      return matchesSearch && matchesMonth;
    });
  }, [searchTerm, selectedMonth]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8f9fa] font-sans text-gray-800 selection:bg-red-200 selection:text-red-900">
      {/* استيراد خط القاهرة من جوجل */}
      <style dangerouslySetInnerHTML={{__html: \`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
        body { font-family: 'Cairo', sans-serif; }
        .erc-red { background-color: #cd000b; }
        .text-erc-red { color: #cd000b; }
        .border-erc-red { border-color: #cd000b; }
        
        /* تأثيرات حركية للكروت */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.5s ease-out forwards;
        }
      \`}} />

      {/* Header Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* الشعار والعنوان */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full erc-red flex items-center justify-center shadow-lg shadow-red-200">
                {/* رسم هلال مبسط بـ SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">الأجندة التفاعلية</h1>
                <p className="text-sm text-gray-500 font-semibold">الهلال الأحمر المصري • 2026</p>
              </div>
            </div>

            {/* شريط البحث */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="ابحث عن مناسبة، صحة، تطوع..."
                className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* فلاتر الأشهر */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={\`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm \${
                selectedMonth === month
                  ? 'erc-red text-white shadow-md shadow-red-200 scale-105'
                  : 'bg-white text-gray-600 hover:bg-red-50 hover:text-erc-red border border-gray-200'
              }\`}
            >
              {month}
            </button>
          ))}
        </div>

        {/* عرض الكروت الشبكية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <div 
                  key={event.id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group animate-fade-up relative overflow-hidden"
                  style={{ animationDelay: \`\${index * 0.05}s\` }}
                >
                  {/* شريط جانبي أحمر يظهر عند الهوفر */}
                  <div className="absolute top-0 right-0 h-full w-1.5 erc-red transform origin-right scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"></div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col items-center justify-center bg-red-50 rounded-xl p-3 min-w-[70px] border border-red-100 group-hover:border-red-200 transition-colors">
                      <span className="text-erc-red text-2xl font-black leading-none">{event.day}</span>
                      <span className="text-red-800 text-xs font-bold mt-1">{event.month}</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-full text-gray-400 group-hover:text-erc-red group-hover:bg-red-50 transition-colors">
                      <Icon size={22} strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className="mt-2">
                    <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-md mb-2 group-hover:bg-red-50 group-hover:text-erc-red transition-colors">
                      {event.weekday}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-erc-red transition-colors">
                      {event.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full erc-red"></span>
                      {event.category}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
              <Calendar size={64} className="mb-4 text-gray-300" strokeWidth={1} />
              <h2 className="text-2xl font-bold text-gray-500 mb-2">لا توجد نتائج</h2>
              <p>لم نتمكن من العثور على أي أيام تتطابق مع بحثك.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedMonth('الكل'); }}
                className="mt-6 px-6 py-2 bg-white border border-gray-300 rounded-full text-gray-700 font-bold hover:bg-gray-50 transition-colors"
              >
                إعادة ضبط البحث
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
