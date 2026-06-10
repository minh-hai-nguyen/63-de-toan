import type { ExamSeed } from "./types";

const R = String.raw;

export const de01: ExamSeed = {
  number: 1,
  title: "Đề số 01",
  durationMin: 120,
  isPublished: true,
  questions: [
    // ───────────── PHẦN I – TRẮC NGHIỆM ─────────────
    {
      part: "MC",
      order: 1,
      stem: R`Phương trình $(m-1)x+2=0$ là phương trình bậc nhất một ẩn nếu`,
      choices: [
        { key: "A", text: R`$m=1$` },
        { key: "B", text: R`$m\neq 1$` },
        { key: "C", text: R`$m\neq 2$` },
        { key: "D", text: R`$m\neq 0$` },
      ],
      correctKey: "B",
      topic: "PHUONG_TRINH_HE_PT",
      difficulty: "NHAN_BIET",
    },
    {
      part: "MC",
      order: 2,
      stem: R`Điều kiện xác định của biểu thức $A=\sqrt{1-2x}$ là`,
      choices: [
        { key: "A", text: R`$x\le \dfrac{1}{2}$` },
        { key: "B", text: R`$x< \dfrac{1}{2}$` },
        { key: "C", text: R`$x> \dfrac{1}{2}$` },
        { key: "D", text: R`$x\ge \dfrac{1}{2}$` },
      ],
      correctKey: "A",
      topic: "RUT_GON_BIEU_THUC",
      difficulty: "THONG_HIEU",
    },
    {
      part: "MC",
      order: 3,
      stem: R`Đồ thị hàm số nào sau đây đi qua điểm có tọa độ $(3;3)$?`,
      choices: [
        { key: "A", text: R`$y=x^2$` },
        { key: "B", text: R`$y=\dfrac{1}{2}x^2$` },
        { key: "C", text: R`$y=3x^2$` },
        { key: "D", text: R`$y=\dfrac{1}{3}x^2$` },
      ],
      correctKey: "D",
      topic: "HAM_SO_DO_THI",
      difficulty: "THONG_HIEU",
    },
    {
      part: "MC",
      order: 4,
      stem: R`Bất phương trình bậc nhất $2x+3\le 9$ có nghiệm là`,
      choices: [
        { key: "A", text: R`$x<3$` },
        { key: "B", text: R`$x>3$` },
        { key: "C", text: R`$x\le 3$` },
        { key: "D", text: R`$x\ge 3$` },
      ],
      correctKey: "C",
      topic: "BAT_PHUONG_TRINH",
      difficulty: "NHAN_BIET",
    },
    {
      part: "MC",
      order: 5,
      stem: R`Cho tam giác $ABC$ vuông tại $A$. Khẳng định nào sau đây là <strong>sai</strong>?`,
      choices: [
        { key: "A", text: R`$\sin B=\cos C$` },
        { key: "B", text: R`$\cos B=\sin(90^\circ - C)$` },
        { key: "C", text: R`$\tan B=\cot C$` },
        { key: "D", text: R`$\cos B=\sin(90^\circ - B)$` },
      ],
      correctKey: "B",
      topic: "HE_THUC_LUONG",
      difficulty: "THONG_HIEU",
    },
    {
      part: "MC",
      order: 6,
      stem: R`Cho đường tròn $(O;5\,\text{cm})$ và hai điểm $A,B$. Biết rằng $OA=5\,\text{cm}$, $OB=\sqrt{26}\,\text{cm}$. Khi đó`,
      choices: [
        { key: "A", text: R`Điểm $A$ nằm trong đường tròn, điểm $B$ nằm ngoài đường tròn.` },
        { key: "B", text: R`Điểm $A$ nằm ngoài đường tròn, điểm $B$ nằm ngoài đường tròn.` },
        { key: "C", text: R`Điểm $A$ nằm trên đường tròn, điểm $B$ nằm ngoài đường tròn.` },
        { key: "D", text: R`Điểm $A$ nằm trên đường tròn, điểm $B$ nằm trong đường tròn.` },
      ],
      correctKey: "C",
      topic: "HINH_HOC_DUONG_TRON",
      difficulty: "THONG_HIEU",
    },
    {
      part: "MC",
      order: 7,
      stem: R`Một cửa hàng đem cân một số bao gạo (đơn vị kilôgam), kết quả thu được ghi lại ở bảng sau:
<table class="qtable"><tbody>
<tr><th>Khối lượng một bao</th><td>40</td><td>45</td><td>50</td><td>55</td><td>60</td><td>65</td></tr>
<tr><th>Tần số</th><td>2</td><td>3</td><td>6</td><td>8</td><td>4</td><td>1</td></tr>
</tbody></table>
Khối lượng mỗi bao gạo nhận các giá trị là:`,
      choices: [
        { key: "A", text: R`$40;45;50;55;60$` },
        { key: "B", text: R`$40;45;50;55;60;65$` },
        { key: "C", text: R`$2;3;6;8;4;1$` },
        { key: "D", text: R`$2;3;6;8;4$` },
      ],
      correctKey: "B",
      topic: "THONG_KE",
      difficulty: "NHAN_BIET",
    },
    {
      part: "MC",
      order: 8,
      stem: R`Bạn Nam gieo một con xúc xắc 10 lần liên tiếp thì thấy mặt 4 chấm xuất hiện 3 lần. Xác suất thực nghiệm xuất hiện mặt 4 chấm là:`,
      choices: [
        { key: "A", text: R`$\dfrac{3}{10}$` },
        { key: "B", text: R`$\dfrac{4}{10}$` },
        { key: "C", text: R`$\dfrac{7}{10}$` },
        { key: "D", text: R`$\dfrac{3}{14}$` },
      ],
      correctKey: "A",
      topic: "XAC_SUAT",
      difficulty: "NHAN_BIET",
    },

    // ───────────── PHẦN II – TỰ LUẬN ─────────────
    {
      part: "ESSAY",
      order: 9,
      points: 1.5,
      topic: "PHUONG_TRINH_HE_PT",
      difficulty: "VAN_DUNG",
      hint: R`Phương trình dạng tích: cho từng thừa số bằng $0$. Với hệ, trừ vế theo vế để khử $x$, tìm $y$ rồi thế trở lại.`,
      stem: R`Giải phương trình và hệ phương trình sau:
a) $(2x+9)\left(\dfrac{2}{3}x-5\right)=0$
b) $\begin{cases} 3x+6y=-9\\ 3x+4y=-5\end{cases}$`,
      solution: R`a) Tích bằng $0$ nên một trong hai thừa số bằng $0$:
- TH1: $2x+9=0 \Rightarrow x=-\dfrac{9}{2}.$
- TH2: $\dfrac{2}{3}x-5=0 \Rightarrow x=\dfrac{15}{2}.$
Vậy phương trình có hai nghiệm $x=-\dfrac{9}{2}$ và $x=\dfrac{15}{2}.$

b) Trừ vế theo vế: $(3x+6y)-(3x+4y)=-9-(-5) \Rightarrow 2y=-4 \Rightarrow y=-2.$
Thay vào $3x+4y=-5$: $3x-8=-5 \Rightarrow x=1.$
Vậy hệ phương trình có nghiệm $(x;y)=(1;-2).$`,
    },
    {
      part: "ESSAY",
      order: 10,
      points: 1.0,
      topic: "RUT_GON_BIEU_THUC",
      difficulty: "VAN_DUNG",
      hint: R`Quy đồng với mẫu chung $(\sqrt a-3)(\sqrt a+3)=a-9$, khai triển rồi rút gọn tử số.`,
      stem: R`Rút gọn biểu thức $A=\dfrac{\sqrt{a}+4}{\sqrt{a}-3}+\dfrac{2-\sqrt{a}}{\sqrt{a}+3}+\dfrac{12-6\sqrt{a}}{a-9}$ với $a\ge 0,\ a\neq 9.$`,
      solution: R`Với $a\ge 0,\ a\neq 9$, ta có $a-9=(\sqrt a-3)(\sqrt a+3)$. Quy đồng:
$$A=\dfrac{(\sqrt a+4)(\sqrt a+3)+(2-\sqrt a)(\sqrt a-3)+12-6\sqrt a}{(\sqrt a-3)(\sqrt a+3)}.$$
Khai triển tử: $(\sqrt a+4)(\sqrt a+3)=a+7\sqrt a+12$; $(2-\sqrt a)(\sqrt a-3)=-a+5\sqrt a-6.$
Tử $=(a+7\sqrt a+12)+(-a+5\sqrt a-6)+12-6\sqrt a=6\sqrt a+18=6(\sqrt a+3).$
Do đó $A=\dfrac{6(\sqrt a+3)}{(\sqrt a-3)(\sqrt a+3)}=\dfrac{6}{\sqrt a-3}.$`,
    },
    {
      part: "ESSAY",
      order: 11,
      points: 1.0,
      topic: "PHUONG_TRINH_HE_PT",
      difficulty: "VAN_DUNG",
      hint: R`Điều kiện có nghiệm: $\Delta'\ge 0$. Dùng Viète $x_1+x_2=6$ kết hợp $x_1-x_2=4$ để tìm $x_1,x_2$, rồi suy ra $m=x_1x_2$.`,
      stem: R`Cho phương trình $x^2-6x+m=0$ với $m$ là tham số. Tìm $m$ để phương trình có hai nghiệm $x_1,x_2$ sao cho $x_1-x_2=4.$`,
      solution: R`Ta có $\Delta'=(-3)^2-m=9-m.$ Để phương trình có hai nghiệm thì $\Delta'\ge 0 \Leftrightarrow m\le 9.$
Theo hệ thức Viète: $x_1+x_2=6,\quad x_1x_2=m.$
Kết hợp $x_1-x_2=4$ với $x_1+x_2=6$ ta được $x_1=5,\ x_2=1.$
Khi đó $m=x_1x_2=5\cdot 1=5$ (thỏa mãn $m\le 9$).
Vậy $m=5.$`,
    },
    {
      part: "ESSAY",
      order: 12,
      points: 1.0,
      topic: "TOAN_THUC_TE",
      difficulty: "VAN_DUNG",
      hint: R`Gọi vận tốc xe khách là $x$ (km/h). Lập phương trình theo hiệu thời gian $=\dfrac{5}{6}$ giờ ($50$ phút), đưa về phương trình bậc hai rồi loại nghiệm âm.`,
      stem: R`Một xe khách và một xe du lịch khởi hành đồng thời từ $A$ đến $B$. Biết vận tốc của xe du lịch lớn hơn vận tốc của xe khách là $20$ km/h. Do đó xe du lịch đến $B$ trước xe khách $50$ phút. Tính vận tốc của mỗi xe, biết quãng đường $AB$ dài $100$ km.`,
      solution: R`Gọi vận tốc xe khách là $x$ (km/h), $x>0$; vận tốc xe du lịch là $x+20$ (km/h).
Thời gian xe khách: $\dfrac{100}{x}$ (giờ); thời gian xe du lịch: $\dfrac{100}{x+20}$ (giờ).
Xe du lịch đến sớm hơn $50$ phút $=\dfrac{5}{6}$ giờ nên:
$$\dfrac{100}{x}-\dfrac{100}{x+20}=\dfrac{5}{6} \;\Leftrightarrow\; x^2+20x-2400=0.$$
Giải ra $x=40$ (thỏa mãn) hoặc $x=-60$ (loại).
Vậy vận tốc xe khách là $40$ km/h, xe du lịch là $60$ km/h.`,
    },
    {
      part: "ESSAY",
      order: 13,
      points: 1.0,
      topic: "HINH_KHONG_GIAN",
      difficulty: "VAN_DUNG",
      hint: R`Thể tích nón $V=\dfrac{1}{3}\pi r^2 h$. Phần rượu là nón nhỏ đồng dạng cao $7-3=4$ cm ⇒ bán kính theo tỉ lệ. Lấy hiệu thể tích rồi chia cho thể tích ly.`,
      stem: R`Một cái ly thủy tinh, phần phía trên là hình nón có chiều cao $7$ cm, đáy là đường tròn đường kính $8$ cm.
a) Tính thể tích của cái ly (bề dày của ly không đáng kể).
b) Biết trong ly đang chứa rượu với mức rượu cách miệng ly $3$ cm. Hỏi thể tích còn lại của ly (phần không chứa rượu) chiếm bao nhiêu phần trăm thể tích ly? (làm tròn đến chữ số thập phân thứ hai)
<img class="qfig" src="/exam-figures/de01-c13.png" alt="Hình minh hoạ cái ly hình nón" />`,
      solution: R`a) Bán kính đáy $r=4$ cm, chiều cao $h=7$ cm. Thể tích cái ly:
$$V_1=\dfrac{1}{3}\pi r^2 h=\dfrac{1}{3}\pi\cdot 4^2\cdot 7=\dfrac{112}{3}\pi\ (\text{cm}^3).$$
b) Phần rượu là hình nón nhỏ có chiều cao $7-3=4$ cm. Theo tỉ lệ đồng dạng, bán kính mặt rượu là $r'=\dfrac{4}{7}\cdot 4=\dfrac{16}{7}$ cm.
$$V_2=\dfrac{1}{3}\pi\left(\dfrac{16}{7}\right)^2\cdot 4=\dfrac{1024}{147}\pi\ (\text{cm}^3).$$
Thể tích phần không chứa rượu: $V_3=V_1-V_2=\dfrac{112}{3}\pi-\dfrac{1024}{147}\pi=\dfrac{1488}{49}\pi.$
Tỉ lệ: $\dfrac{V_3}{V_1}\cdot 100\%\approx 81{,}34\%.$`,
    },
    {
      part: "ESSAY",
      order: 14,
      points: 2.0,
      topic: "HINH_HOC_DUONG_TRON",
      difficulty: "VAN_DUNG_CAO",
      hint: R`a) Hai đỉnh $E,F$ cùng nhìn $BC$ dưới góc vuông ⇒ tứ giác nội tiếp. b) Chứng minh $EF\parallel MN$ rồi $OA\perp MN$. c) Trung tuyến $EI=\dfrac{1}{2}AH$ không đổi nên $S_{AEH}=\dfrac{1}{2}AH\cdot ED\le\dfrac{1}{2}AH\cdot EI$.`,
      stem: R`Cho đường tròn $(O)$ và dây cung $BC$. Điểm $A$ di chuyển trên cung lớn $BC$ sao cho tam giác $ABC$ nhọn. Đường cao $BE,CF$ của tam giác $ABC$ cắt nhau tại $H$ và cắt đường tròn $(O)$ lần lượt tại $M,N.$
a) Chứng minh tứ giác $BCEF$ nội tiếp.
b) Giả sử đường tròn $(O)$ và dây $BC$ cố định, chứng minh $EF\perp OA.$
c) Xác định vị trí điểm $A$ trên cung lớn $BC$ để diện tích tam giác $AEH$ đạt giá trị lớn nhất.
<img class="qfig" src="/exam-figures/de01-c14.png" alt="Hình câu 14: đường tròn (O) và tam giác ABC" />`,
      solution: R`a) Vì $BE,CF$ là đường cao nên $\widehat{BEC}=\widehat{BFC}=90^\circ.$ Hai đỉnh $E,F$ cùng nhìn $BC$ dưới góc vuông nên $B,C,E,F$ cùng thuộc đường tròn đường kính $BC$, tức tứ giác $BCEF$ nội tiếp.

b) Từ $BCEF$ nội tiếp: $\widehat{FEB}=\widehat{FCB}$ (cùng chắn $\overset{\frown}{BF}$). Trong $(O)$: $\widehat{NMB}=\widehat{FCB}$ (cùng chắn $\overset{\frown}{BN}$). Suy ra $\widehat{FEB}=\widehat{NMB}$, ở vị trí đồng vị nên $EF\parallel MN.$
Lại có $\widehat{ABM}=\widehat{ACN}$ nên các cung $\overset{\frown}{AM}=\overset{\frown}{AN}$, do đó tam giác $MON$ cân tại $O$ với $OA$ là phân giác, suy ra $OA\perp MN.$ Vì $EF\parallel MN$ nên $OA\perp EF.$

c) Gọi $I,K$ lần lượt là trung điểm $AH,BC$. Khi đó $I,K$ là tâm các đường tròn ngoại tiếp $AEHF$ và $BCEF$ nên $KI$ là trung trực của $EF$, suy ra $KI\perp EF$; mà $OA\perp EF$ nên $OA\parallel KI.$ Mặt khác $AH\perp BC$ và $OK\perp BC$ nên $AH\parallel OK.$ Vậy $AOKI$ là hình bình hành, suy ra $AI=OK$, tức $AH=2\,OK$ (không đổi).
Tam giác $AEH$ vuông tại $E$ có trung tuyến $EI=\dfrac{1}{2}AH=OK$ (không đổi). Kẻ $ED\perp AH$ thì $ED\le EI$, nên
$$S_{AEH}=\dfrac{1}{2}AH\cdot ED\le \dfrac{1}{2}AH\cdot EI=OK^2\ (\text{không đổi}).$$
Dấu "=" xảy ra khi $ED=EI$, tức tam giác $AEH$ vuông cân tại $E$, khi $\widehat{ACB}=45^\circ.$
Vậy diện tích $\triangle AEH$ lớn nhất khi $A$ nằm trên cung lớn $BC$ sao cho $\widehat{ACB}=45^\circ.$`,
    },
    {
      part: "ESSAY",
      order: 15,
      points: 0.5,
      topic: "BAT_DANG_THUC_GTLN_GTNN",
      difficulty: "VAN_DUNG_CAO",
      hint: R`Đặt $a=v-6>0$, biến đổi $\dfrac{v^3}{v-6}=\dfrac{(a+6)^3}{a}$ rồi dùng bất đẳng thức AM–GM để tìm giá trị nhỏ nhất; dấu bằng cho $v=9$.`,
      stem: R`Một người chạy bộ ngược chiều gió trên quãng đường dài $s$, biết vận tốc gió là $6$ km/h. Nếu vận tốc của người chạy khi không có gió là $v$ (km/h) thì năng lượng tiêu hao trong $t$ giờ cho bởi $E=c\cdot v^3\cdot t$ ($c$ là hằng số, đơn vị Jun). Tìm vận tốc chạy để năng lượng tiêu hao là ít nhất.`,
      solution: R`Vận tốc thực khi chạy ngược gió là $v-6$ (km/h), thời gian $t=\dfrac{s}{v-6}$ (với $v>6$). Khi đó
$$E(v)=c\cdot v^3\cdot \dfrac{s}{v-6}.$$
Đặt $a=v-6>0$ thì $v=a+6$ và
$$\dfrac{v^3}{v-6}=\dfrac{(a+6)^3}{a}=a^2+18a+108+\dfrac{216}{a}.$$
Ta có $a^2+18a+\dfrac{216}{a}=\left(a^2+\dfrac{27}{a}+\dfrac{27}{a}\right)+18\left(a+\dfrac{9}{a}\right)\ge 3\sqrt[3]{27\cdot 27}+18\cdot 2\sqrt{9}=27+108=135.$
Dấu "=" xảy ra khi $a=3$, tức $v=9.$
Vậy người đó nên chạy với vận tốc $9$ km/h để năng lượng tiêu hao ít nhất.`,
    },
  ],
};

export default de01;
