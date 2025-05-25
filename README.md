DermaLyzeMobile

DermaLyzeMobile, dermatolojik hastalıkları analiz eden ve bu hastalıklar hakkında bir asistandan bilgi alabileceğiniz, saf React Native ile geliştirilmiş bir mobil uygulamadır. Projede npm ile paket yönetimi kullanılmaktadır.

Başlarken

Metro Bundler’ı başlatın

npx react-native start

Bu komut, Metro bundler’ı çalıştırarak uygulamanın ön yüzünü ayağa kaldırır.

Yapay zeka sunucusunu çalıştırın

Başka bir terminal penceresinde proje kök dizinindeki server klasörüne geçip şu komutu yürütün:

cd server
python app.py

Önemli: app.py dosyası çalıştırılmadığı takdirde uygulamanın yapay zeka özellikleri devre dışı kalır ve model tahminleri gerçekleşmez.

Uygulamayı cihazda veya emülatörde başlatın

Metro bundler ve Python sunucusu çalışır durumdayken, farklı bir terminalde projenin ana dizininden aşağıdaki komutlardan birini çalıştırabilirsiniz:

Android:

npx react-native run-android

iOS:

npx react-native run-ios

Bu adımları izleyerek hem uygulamanın ön yüzü hem de arka plandaki yapay zeka servisi eksiksiz şekilde çalışacaktır.
