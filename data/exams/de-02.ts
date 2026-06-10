import type { ExamSeed } from "./types";

const R = String.raw;

export const de02: ExamSeed = {
  number: 2,
  title: "Đề số 02",
  durationMin: 120,
  isPublished: true,
  questions: [
    // ───────────── PHẦN I – TRẮC NGHIỆM ─────────────
    {
      part: "MC",
      order: 1,
      stem: R`Cho phương trình $ax^2+bx+c=0\ (a\neq 0)$ có biệt thức $\Delta=b^2-4ac.$ Phương trình đã cho vô nghiệm khi`,
      choices: [
        { key: "A", text: R`$\Delta<0$` },
        { key: "B", text: R`$\Delta>0$` },
        { key: "C", text: R`$\Delta\ge 0$` },
        { key: "D", text: R`$\Delta\le 0$` },
      ],
      correctKey: "A",
      topic: "PHUONG_TRINH_HE_PT",
      difficulty: "NHAN_BIET",
    },
    {
      part: "MC",
      order: 2,
      stem: R`Giá trị của biểu thức $\left(\sqrt{75}-\sqrt{12}+\sqrt{3}\right):\sqrt{3}$ là`,
      choices: [
        { key: "A", text: R`$\dfrac{5}{\sqrt 3}$` },
        { key: "B", text: R`$4$` },
        { key: "C", text: R`$\dfrac{\sqrt 3}{5}$` },
        { key: "D", text: R`$5$` },
      ],
      correctKey: "B",
      topic: "RUT_GON_BIEU_THUC",
      difficulty: "THONG_HIEU",
    },
    {
      part: "MC",
      order: 3,
      stem: R`Đồ thị hàm số $y=3x^2$ đi qua điểm nào trong các điểm sau đây?`,
      choices: [
        { key: "A", text: R`$A(1;3)$` },
        { key: "B", text: R`$B(-1;-3)$` },
        { key: "C", text: R`$C(1;-3)$` },
        { key: "D", text: R`$D(3;-1)$` },
      ],
      correctKey: "A",
      topic: "HAM_SO_DO_THI",
      difficulty: "THONG_HIEU",
    },
    {
      part: "MC",
      order: 4,
      stem: R`Trong các số sau: $4;\ -3;\ 3;\ 10$, những số là nghiệm của bất phương trình $2x+3\le 9$ là`,
      choices: [
        { key: "A", text: R`$-3;\ 3;\ 10$` },
        { key: "B", text: R`$3;\ 4$` },
        { key: "C", text: R`$-3;\ 3$` },
        { key: "D", text: R`$-3;\ 3;\ 4$` },
      ],
      correctKey: "C",
      topic: "BAT_PHUONG_TRINH",
      difficulty: "THONG_HIEU",
    },
    {
      part: "MC",
      order: 5,
      stem: R`Cho tam giác $ABC$ vuông tại $A$, có $AB=6$ cm, $AC=8$ cm. Khi đó $\sin B$ có giá trị bằng`,
      choices: [
        { key: "A", text: R`$0,6$` },
        { key: "B", text: R`$\dfrac{4}{5}$` },
        { key: "C", text: R`$\dfrac{5}{4}$` },
        { key: "D", text: R`$\dfrac{4}{3}$` },
      ],
      correctKey: "B",
      topic: "HE_THUC_LUONG",
      difficulty: "THONG_HIEU",
    },
    {
      part: "MC",
      order: 6,
      stem: R`Cho đường tròn $(O;3\,\text{cm})$ và đường thẳng $a$. Gọi $d$ là khoảng cách từ tâm $O$ đến đường thẳng $a$. Khẳng định nào dưới đây là <strong>sai</strong>?`,
      choices: [
        { key: "A", text: R`Đường tròn và đường thẳng $a$ cắt nhau khi $d<3$ cm.` },
        { key: "B", text: R`Đường tròn và đường thẳng $a$ tiếp xúc nhau khi $d=3$ cm.` },
        { key: "C", text: R`Đường tròn và đường thẳng $a$ không giao nhau khi $d>3$ cm.` },
        { key: "D", text: R`Đường thẳng $a$ là tiếp tuyến của đường tròn khi $d\le 3$ cm.` },
      ],
      correctKey: "D",
      topic: "HINH_HOC_DUONG_TRON",
      difficulty: "THONG_HIEU",
    },
    {
      part: "MC",
      order: 7,
      stem: R`Một giáo viên thể dục đo chiều cao (tính theo cm) của một nhóm học sinh nữ lớp 6, cho bởi bảng tần số sau:
<table class="qtable"><tbody>
<tr><th>Chiều cao</th><td>140</td><td>141</td><td>143</td><td>145</td><td>149</td><td>150</td><td>160</td></tr>
<tr><th>Tần số</th><td>4</td><td>5</td><td>2</td><td>3</td><td>6</td><td>4</td><td>1</td></tr>
</tbody></table>
Tần số của giá trị $141$ và $145$ lần lượt là`,
      choices: [
        { key: "A", text: R`$4;\ 2$` },
        { key: "B", text: R`$5;\ 6$` },
        { key: "C", text: R`$5;\ 3$` },
        { key: "D", text: R`$3;\ 5$` },
      ],
      correctKey: "C",
      topic: "THONG_KE",
      difficulty: "NHAN_BIET",
    },
    {
      part: "MC",
      order: 8,
      stem: R`Gieo hai đồng xu cân đối và đồng chất. Xác suất của biến cố "Hai đồng xu đều xuất hiện mặt sấp" là`,
      choices: [
        { key: "A", text: R`$\dfrac{1}{4}$` },
        { key: "B", text: R`$\dfrac{3}{4}$` },
        { key: "C", text: R`$\dfrac{2}{4}$` },
        { key: "D", text: R`$1$` },
      ],
      correctKey: "A",
      topic: "XAC_SUAT",
      difficulty: "THONG_HIEU",
    },

    // ───────────── PHẦN II – TỰ LUẬN ─────────────
    {
      part: "ESSAY",
      order: 9,
      points: 1.5,
      topic: "PHUONG_TRINH_HE_PT",
      difficulty: "VAN_DUNG",
      hint: R`Đặt nhân tử chung $(2x+3)$ để đưa về phương trình tích. Với hệ, cộng vế theo vế để khử $y$.`,
      stem: R`Giải phương trình và hệ phương trình sau:
a) $5x(2x+3)-4(2x+3)=0$
b) $\begin{cases} 2x-y=3\\ 3x+y=7\end{cases}$`,
      solution: R`a) Đặt nhân tử chung: $(2x+3)(5x-4)=0.$
- $2x+3=0 \Rightarrow x=-\dfrac{3}{2}.$
- $5x-4=0 \Rightarrow x=\dfrac{4}{5}.$
Vậy phương trình có hai nghiệm $x=-\dfrac{3}{2}$ và $x=\dfrac{4}{5}.$

b) Cộng vế theo vế: $(2x-y)+(3x+y)=3+7 \Rightarrow 5x=10 \Rightarrow x=2.$
Thay vào $3x+y=7$: $6+y=7 \Rightarrow y=1.$
Vậy hệ có nghiệm $(x;y)=(2;1).$`,
    },
    {
      part: "ESSAY",
      order: 10,
      points: 1.0,
      topic: "RUT_GON_BIEU_THUC",
      difficulty: "VAN_DUNG",
      hint: R`Quy đồng với mẫu chung $(\sqrt a-2)(\sqrt a+2)=a-4$, khai triển rồi rút gọn tử số.`,
      stem: R`Rút gọn biểu thức $F=\dfrac{\sqrt a+3}{\sqrt a-2}+\dfrac{1-\sqrt a}{\sqrt a+2}+\dfrac{4-4\sqrt a}{a-4}$ với $a\ge 0,\ a\neq 4.$`,
      solution: R`Với $a\ge 0,\ a\neq 4$, ta có $a-4=(\sqrt a-2)(\sqrt a+2)$. Quy đồng:
$$F=\dfrac{(\sqrt a+3)(\sqrt a+2)+(1-\sqrt a)(\sqrt a-2)+4-4\sqrt a}{(\sqrt a-2)(\sqrt a+2)}.$$
Khai triển tử: $(\sqrt a+3)(\sqrt a+2)=a+5\sqrt a+6$; $(1-\sqrt a)(\sqrt a-2)=-a+3\sqrt a-2.$
Tử $=(a+5\sqrt a+6)+(-a+3\sqrt a-2)+4-4\sqrt a=4\sqrt a+8=4(\sqrt a+2).$
Do đó $F=\dfrac{4(\sqrt a+2)}{(\sqrt a-2)(\sqrt a+2)}=\dfrac{4}{\sqrt a-2}.$`,
    },
    {
      part: "ESSAY",
      order: 11,
      points: 1.0,
      topic: "PHUONG_TRINH_HE_PT",
      difficulty: "VAN_DUNG",
      hint: R`Tính $\Delta'=m^2+1>0$ nên phương trình luôn có hai nghiệm. Dùng Viète kết hợp $x_2=-5x_1$ để tìm hai nghiệm, rồi thay vào tích $x_1x_2$ để suy ra $m$.`,
      stem: R`Cho phương trình $x^2-4x-m^2+3=0$ với $m$ là tham số. Tìm $m$ để phương trình có hai nghiệm phân biệt thỏa mãn $x_2=-5x_1.$`,
      solution: R`Ta có $\Delta'=(-2)^2-1\cdot(-m^2+3)=m^2+1>0\ \forall m$, nên phương trình luôn có hai nghiệm phân biệt.
Theo Viète: $x_1+x_2=4\ (1),\quad x_1x_2=-m^2+3\ (2).$
Từ $x_2=-5x_1$ và $(1)$: $x_1-5x_1=4 \Rightarrow x_1=-1,\ x_2=5.$
Thay vào $(2)$: $(-1)\cdot 5=-m^2+3 \Rightarrow -5=-m^2+3 \Rightarrow m^2=8 \Rightarrow m=\pm 2\sqrt 2.$
Vậy $m=\pm 2\sqrt 2.$`,
    },
    {
      part: "ESSAY",
      order: 12,
      points: 1.0,
      topic: "TOAN_THUC_TE",
      difficulty: "VAN_DUNG",
      hint: R`Gọi số sản phẩm tháng đầu của đội I, đội II là $x,y$. Lập hệ: $x+y=1100$ và $1{,}15x+1{,}2y=1295$.`,
      stem: R`Tháng thứ nhất hai đội sản xuất được $1100$ sản phẩm. Sang tháng thứ hai, đội I làm vượt mức $15\%$ và đội II làm vượt mức $20\%$ so với tháng thứ nhất, vì vậy cả hai đội làm được $1295$ sản phẩm. Hỏi trong tháng thứ nhất mỗi đội làm được bao nhiêu sản phẩm?`,
      solution: R`Gọi số sản phẩm tháng thứ nhất của đội I là $x$, đội II là $y$ ($x,y\in\mathbb{N}^*$).
Tháng thứ nhất: $x+y=1100\ (1).$
Tháng thứ hai đội I làm $1,15x$; đội II làm $1,2y$, nên $1,15x+1,2y=1295\ (2).$
Giải hệ $(1),(2)$ được $x=500,\ y=600.$
Vậy tháng thứ nhất đội I làm $500$ sản phẩm, đội II làm $600$ sản phẩm.`,
    },
    {
      part: "ESSAY",
      order: 13,
      points: 1.0,
      topic: "HINH_KHONG_GIAN",
      difficulty: "VAN_DUNG",
      hint: R`Thể tích trụ $=\pi r^2 h$. Thể tích chai = phần chứa nước + phần không chứa nước (khi lật ngược). Lấy thể tích thùng chia cho $95\%$ thể tích chai rồi làm tròn xuống.`,
      stem: R`Một cửa hàng bán mật ong đựng trong thùng hình trụ chiều cao $h=30$ cm, bán kính đáy $R=8$ cm. Khi bán, người bán rót mật vào một chai hình trụ. Ông An đo đường kính đáy chai bằng $6$ cm, đo chiều cao phần trụ chứa nước trong chai được $8$ cm, rồi lật ngược chai và đo chiều cao phần trụ không chứa nước được $5$ cm.
a) Tính thể tích của chai đựng (bỏ qua bề dày thành và đáy chai).
b) Thực tế thể tích mật khi đổ vào chỉ đạt $95\%$ thể tích chai. Với lượng mật đang có trong thùng, ông An bán được nhiều nhất bao nhiêu chai?
<img class="qfig" src="/exam-figures/de02-c13.png" alt="Hình câu 13: thùng hình trụ và chai đựng mật" />`,
      solution: R`a) Bán kính đáy chai $r=3$ cm. Thể tích chai bằng tổng thể tích phần chứa nước và phần không chứa nước:
$$V_{\text{chai}}=\pi\cdot 3^2\cdot 8+\pi\cdot 3^2\cdot 5=72\pi+45\pi=117\pi\approx 367,6\ (\text{cm}^3).$$
b) Thể tích mật trong thùng: $V=\pi R^2 h=\pi\cdot 8^2\cdot 30=1920\pi\ (\text{cm}^3).$
Lượng mật mỗi chai chứa được: $117\pi\cdot 95\%=111,15\pi\ (\text{cm}^3).$
Số chai bán được: $\dfrac{1920\pi}{111,15\pi}\approx 17,3.$
Vậy ông An bán được nhiều nhất $17$ chai mật ong.`,
    },
    {
      part: "ESSAY",
      order: 14,
      points: 2.0,
      topic: "HINH_HOC_DUONG_TRON",
      difficulty: "VAN_DUNG_CAO",
      hint: R`a) Hai đỉnh $E,F$ cùng nhìn $AH$ dưới góc vuông ⇒ thuộc đường tròn đường kính $AH$. b) Chứng minh $\widehat{IEN}=90^\circ$ ⇒ $NE$ là tiếp tuyến. c) Dùng Pythagore trong $\triangle CIK$ và tam giác đồng dạng $\triangle KBH\sim\triangle KAC$.`,
      stem: R`Cho tam giác $ABC$ có ba góc đều nhọn. Các đường cao $AK,BE,CF$ cắt nhau tại $H$. Gọi $I$ là trung điểm $AH$, $N$ là trung điểm $BC$.
a) Chứng minh bốn điểm $A,E,H,F$ nằm trên cùng một đường tròn.
b) Chứng minh $NE$ là tiếp tuyến của đường tròn đường kính $AH.$
c) Chứng minh $CI^2-IE^2=CK\cdot CB.$
<img class="qfig" src="/exam-figures/de02-c14.png" alt="Hình câu 14: tam giác ABC và các đường cao" />`,
      solution: R`a) Ta có $\widehat{AEH}=\widehat{AFH}=90^\circ$ (vì $BE,CF$ là đường cao). Hai đỉnh $E,F$ cùng nhìn $AH$ dưới góc vuông nên $A,E,H,F$ thuộc đường tròn đường kính $AH$ (tâm $I$).

b) Theo câu a, $IA=IE$ nên $\triangle IAE$ cân tại $I$, suy ra $\widehat{IAE}=\widehat{IEA}\ (1).$
$\triangle EBC$ vuông tại $E$ có $EN$ là trung tuyến ứng với cạnh huyền $BC$ nên $EN=NC$, do đó $\triangle ENC$ cân tại $N$, suy ra $\widehat{NEC}=\widehat{NCE}\ (2).$
Trong $\triangle AKC$ vuông tại $K$: $\widehat{IAE}+\widehat{NCE}=90^\circ\ (3).$
Từ $(1),(2),(3)$: $\widehat{IEA}+\widehat{NEC}=90^\circ$, mà $\widehat{IEA}+\widehat{IEN}+\widehat{NEC}=180^\circ$ (do $A,E,C$ thẳng hàng) nên $\widehat{IEN}=90^\circ.$
Vậy $EN\perp EI$ tại $E$, suy ra $NE$ là tiếp tuyến của đường tròn đường kính $AH.$

c) Áp dụng định lí Pythagore trong $\triangle CIK$ vuông tại $K$: $CI^2=CK^2+IK^2.$
Vì $IE=IH=IA$ (bán kính đường tròn tâm $I$) nên
$$CI^2-IE^2=CK^2+IK^2-IE^2=CK^2+(IK+IE)(IK-IE)=CK^2+AK\cdot KH.$$
Mặt khác $CK\cdot CB=CK(CK+KB)=CK^2+CK\cdot KB.$
Xét $\triangle KBH$ và $\triangle KAC$: $\widehat{KBH}=\widehat{KAC}$ (cùng phụ $\widehat{ACB}$), $\widehat{BKH}=\widehat{AKC}=90^\circ$ nên đồng dạng, suy ra $AK\cdot KH=CK\cdot KB.$
Do đó $CI^2-IE^2=CK^2+CK\cdot KB=CK\cdot CB.$`,
    },
    {
      part: "ESSAY",
      order: 15,
      points: 0.5,
      topic: "BAT_DANG_THUC_GTLN_GTNN",
      difficulty: "VAN_DUNG_CAO",
      hint: R`Xét số dư khi chia cho $3$: chứng minh mọi số viết thêm đều $\equiv 2\pmod 3$. Mà $2025$ chia hết cho $3$ nên không thể viết được.`,
      stem: R`Trên bảng đang có hai số $1$ và $2$. Thực hiện ghi thêm số lên bảng theo quy tắc: mỗi lần viết lên bảng một số $c=ab+a+b$ với $a,b$ là hai số đã có trên bảng. Hỏi sau một số hữu hạn lần có thể viết được số $2025$ lên bảng không?`,
      solution: R`Nhận xét: $c=ab+a+b=(a+1)(b+1)-1.$ Ban đầu $a+1\in\{2,3\}$. Sau mỗi bước, $c+1=(a+1)(b+1)$ là tích các số dạng "cũ + 1".
Xét theo modulo $3$: ta chứng minh mọi số được viết thêm đều chia $3$ dư $2$.
- Với $a=1,\ b=3k+2$: $c=ab+a+b=6k+5$ chia $3$ dư $2.$
- Với $a=3m+2,\ b=3k+2$: $c=ab+a+b=3(3mk+3k+3m+2)+2$ chia $3$ dư $2.$
Vậy mọi số (khác $1$) trên bảng đều chia $3$ dư $2$. Mà $2025=3\cdot 675$ chia hết cho $3$.
Do đó không thể viết được số $2025$ lên bảng.`,
    },
  ],
};

export default de02;
