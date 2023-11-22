-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2023 at 03:09 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `play-music-final`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `AlbumID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Image` varchar(200) DEFAULT NULL,
  `NumberOfSong` int(11) NOT NULL,
  `ArtistID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`AlbumID`, `Name`, `Image`, `NumberOfSong`, `ArtistID`) VALUES
(1, '99%', 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/9/7/a/2/97a21301630ce3762bd373b6c76d8bec.jpg', 10, 1),
(2, 'Captain Boy', '/img/Rectangle 5.png', 10, 2),
(7, 'Show của Đen', 'https://i.scdn.co/image/ab67706f000000026b3b89886acd5a3f68f60484', 0, 3),
(8, 'Sky Tour', 'https://i.scdn.co/image/ab67616d00001e027663e8afc902209090664782', 0, 4);

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `ArtistID` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Country` varchar(20) NOT NULL,
  `Image` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`ArtistID`, `Name`, `Country`, `Image`) VALUES
(1, 'MCK', 'Việt Nam ', 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/9/0/7/490702cd8724942cfb1290768163d530.jpg'),
(2, 'Captain', 'Việt Nam', 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/2/4/4/32446c240bbbc07a8ce5aee8e635c6ac.jpg'),
(3, 'Đen Vâu', 'Việt Nam ', 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/0/0/a/c/00ace7030443babdd18ff7534fc81bb9.jpg'),
(4, 'Sơn Tùng MTP', 'Việt Nam', 'https://i.scdn.co/image/ab67706f00000002b0cec6a6f725da4223a17e35'),
(5, 'G-Dragon', 'Hàn Quốc', 'https://i.scdn.co/image/ab6761610000f1785923c0ca32a3cf3a81b34728'),
(6, 'Binz', 'Việt Nam', 'https://i.scdn.co/image/ab67616d00001e0259ce5153b7f4c0f23bcc4b61'),
(7, 'GDucky', 'Việt Nam', 'https://i.scdn.co/image/ab6761610000f178629c0323aacab8d3b2e1750f');

-- --------------------------------------------------------

--
-- Table structure for table `artistssong`
--

CREATE TABLE `artistssong` (
  `ArtistID` int(11) NOT NULL,
  `SongID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artistssong`
--

INSERT INTO `artistssong` (`ArtistID`, `SongID`) VALUES
(1, 1),
(2, 2),
(3, 4),
(6, 9),
(7, 5);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryID` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CategoryID`, `Name`) VALUES
(1, 'Rap'),
(2, 'balad'),
(3, 'rock');

-- --------------------------------------------------------

--
-- Table structure for table `categorysong`
--

CREATE TABLE `categorysong` (
  `CategoryID` int(11) NOT NULL,
  `SongID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categorysong`
--

INSERT INTO `categorysong` (`CategoryID`, `SongID`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `favouritelist`
--

CREATE TABLE `favouritelist` (
  `FavouriteListID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favouritelistsong`
--

CREATE TABLE `favouritelistsong` (
  `FavouriteListID` int(11) NOT NULL,
  `SongID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `HistoryID` int(11) NOT NULL,
  `DateOfListen` datetime NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `historysong`
--

CREATE TABLE `historysong` (
  `SongID` int(11) NOT NULL,
  `HistoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE `playlist` (
  `PlaylistID` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Image` varchar(200) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlist`
--

INSERT INTO `playlist` (`PlaylistID`, `Name`, `Image`, `Description`, `UserID`) VALUES
(1, 'Lofi Hits', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/9/0/0/d/900d29d81f4ab570c451fec9ae384f55.jpg', 'Thư giản với những âm thanh lofi thân thuộc', NULL),
(3, 'Nhạc chill yêu đời', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/d/7/f/2/d7f2be2524936221c456876410bc288a.jpg', 'Những giai điệu nhẹ nhàng dễ thương giúp bạn yêu đời hơn', NULL),
(4, 'Hot Hit Việt Nam', 'https://i.scdn.co/image/ab67706f000000020df43c65854c0cc6e4ff7418', 'Đông tới Tây, đây là những ca khúc thịnh hành nhất ở Việt Nam', NULL),
(5, 'Anh Hào nhạc việt', 'https://i.scdn.co/image/ab67706f000000023d27bc5012a37b94d77338bf', 'Những nam thần của làng nhạc Việt', NULL),
(6, 'Thiên hạ nghe gì', 'https://i.scdn.co/image/ab67706f000000029de4a24b211cd3a4a4f80f8f', 'Những gì mà người bên cạnh bạn đang nghe', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `playlistsong`
--

CREATE TABLE `playlistsong` (
  `PlaylistID` int(11) NOT NULL,
  `SongID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlistsong`
--

INSERT INTO `playlistsong` (`PlaylistID`, `SongID`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `SongID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Image` varchar(200) DEFAULT NULL,
  `Lyric` text DEFAULT NULL,
  `Link` varchar(200) NOT NULL,
  `Time` varchar(10) NOT NULL,
  `AlbumID` int(11) DEFAULT NULL,
  `NumberListens` int(11) DEFAULT NULL,
  `status_song` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`SongID`, `Name`, `Image`, `Lyric`, `Link`, `Time`, `AlbumID`, `NumberListens`, `status_song`) VALUES
(1, 'Tại Vì Sao', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/a/e/5/4/ae54e556fabe7740b12186c68cc95fd9.jpg', 'Tại vì sao cảm xúc kia quay về? Là tại ai đã khiến anh như vậy? Một điều mà anh đã biết trước rằng là chỉ cần còn khoảng cách sẽ không thấy nhớ nhau. Nhưng mà em đã lỡ lưu son của em (yeah) lên bức tranh anh tô màu. Vậy thì giờ anh muốn ở bên em thật lâu bởi vì nàng là người làm trái tim anh thấy bớt đau. Baby, em cứ giữ đi anh không cần đâu (woah-oh-oh-woah-oh). Và young boy cô đơn anh cũng muốn được yêu (okay). Baby, tin anh đi, anh không nói điêu. Đề nghị nàng hãy bỏ ngay đi cho anh thói kiêu. Và lắng nghe con tim anh nếu muốn được chiều. Và nếu em là fire thì anh là nước. Bởi vì khi ta gặp nhau thì ta sẽ dập nhau. Cùng trao nhau tình yêu qua nụ hôn thật lâu. Làm phai đi vệt son anh không muốn đậm màu. Và đếm ba con số one, two, three. Và nếu em không vui thì em cứ đi. Vậy anh không muốn giữ đâu, anh ngu gì. Và cũng đừng gọi tìm anh lúc em thấy suy. Vì anh vẫn okay khi anh một mình. Kiểm soát được tâm trí khi anh nhớ em. Và giờ thì anh đã biết cách yêu bản thân mình. Để không một lần nào lỡ hẹn. Sẽ có những lúc anh đi quên lối về. Thì liệu nàng còn vẫn muốn nắm lấy tay anh? Chỉ cần vài vệt son lướt lên trên đôi môi kề. Cảm xúc ấy cứ thế vây quanh. Bước xuống dưới phố khi không còn bóng người. Bởi vì anh đi lang thang khi cô đơn lẻ loi. Vào màn trời đêm đen ngỡ rằng em thấy rồi (oh-oh-oh-oh). Tại vì sao cảm xúc kia quay về? Là tại ai đã khiến anh như vậy? Có nuối tiếc khi... Em cứ đổ tại duyên số cho anh được chạm mặt. Nếu biết sẽ đau khi thật lòng. Liệu có vì một hình bóng mà đem lòng tin vào tình yêu phai màu? Bởi vì em (em, em), mắt em (mắt em). Chỉ toàn là màu xanh của tình yêu làm cho anh lại tưởng đại dương bên thềm (ooh-ooh, yeah). OK, khi (khi) thấy em (thấy em). Là cảm xúc chạm vào nhau vì muốn tận hưởng ngày trôi êm đềm. (Có nuối tiếc khi...) Và nếu anh biết trước anh đã chẳng như thế.', '/musics/ai-cung-co-the-la-quan-quan.mp3', '2:20', 1, 100, b'0'),
(2, 'Rolling Down', 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/b/f/0/1/bf0182328238f2a252496a63e51f1f74.jpg', 'Chỉ là một cơn gió thoáng qua, giữa phố xá nơi giọt sương màu hạ. Chỉ là ước muốn bé đi, để cho nước mắt vơi bớt trên khóe mi. Đằng sau bờ vai, là những bước chân chậm rãi, trôi đi giữa không gian buồn thiu khờ dại. Còn lại suy và tư, trong bức tranh mẹ giữ, chỉ mong sao thời gian không khiến ta tự sự. And I\\\'m rolling rolling rolling down, con đã rơi vào rơi vào trong bức tranh huyền ảo. Rolling rolling rolling rolling down, con đã rơi vào rơi vào. Con mong muốn mama quay lại lúc xưa, vu vơ mấy câu ca vào lúc mưa. Hòa vào màn đêm tối, cùng đoạn đường quen lối, mà sao khung thời gian trôi đi thật vội. Và rồi thanh xuân bay đi qua thật là mau. Ây mẹ không thu âm mà thu mình trong lâu ngày, vì sau này mong tô cơm đầy, là thứ khiến cho mama lại cau mày. Cũng chỉ vì nuôi con lớn, dậy thật là sớm, làm làm làm và làm thật nhiều việc hơn. Trời nóng bức mẹ lại lo toan, cho những đứa con thêm khô khan. Và con luôn mong về quê, vì đó là nơi không chật chỗ để xe, vì đó là nơi mà mẹ chở mẹ che. Hai ba bài nhạc của con có mẹ mở mẹ nghe. And I\\\'m rolling rolling rolling down, con đã rơi vào rơi vào trong bức tranh huyền ảo. Rolling rolling rolling rolling down, con đã rơi vào rơi vào. Đến một ngày con nhận ra, khôn và lớn đó là khi, là khi ăn đòn của mẹ sẽ không khóc, nhưng sẽ khóc khi mà thấy mẹ ướt đôi hàng mi. Con biết con với bố không nói chuyện được lâu, hai người đàn ông nhưng cái nhìn ngược nhau. Và bố dạy con không được run, vì giun thì chỉ đem đi buộc mồi câu. Và con đã làm việc này hằng đêm, con bán cả máy tính, 6 giờ thay đồ làm thêm. Thời gian không có đủ cho việc ngủ, nên là con không có bạn hay là bè đến và làm quen. Thằng Duy vẫn còn mệt, nhưng mà nó sẽ không đau, tên lửa cần nhiên liệu để bay tới mong cầu, với con thì phần quà lớn nhất, không phải quán quân mà chỉ đơn giản là một cái xoa đầu, from mama. Nhiều chông gai con bước đi qua, dù ra sao vẫn luôn nhớ nhà, mẹ cũng chẳng muốn mong thêm điều gì, nhiều khi cũng chỉ muốn quay trở về. Khi mà khi mà khi mà mama mới tròn 20, ước mơ là đứng ở đây, dù cho hồi đó ngày hai lần cơm nguội. Và bây giờ thì đến lượt con, sẽ có những đồ ăn thật ngon, tô cho đẹp thêm màu son. Viết giấc mơ mai sau, vì giờ sẽ có ma ma đứng chờ. And I\\\'m rolling rolling rolling down, con đã rơi vào rơi vào trong bức tranh huyền ảo.Rolling rolling rolling rolling down, con đã rơi vào rơi vào. Sẽ có những giấc mơ không nằm trong tầm với, con đã rơi vào rơi vào trong bức tranh huyền ảo. Rolling rolling rolling rolling down, con đã rơi vào rơi vào. Hey y eey he aay he aay.', './src/public/music/rollin-down.mp3', '1:20', 2, 110, b'0'),
(4, 'Nấu ăn cho em', '/img/Rectangle 33.png', 'Kìa mây, mây ngang đầu, kia núi, núi lô nhô\nCùng em trên con đường, đường bé xíu quanh co\nBăng qua những ngọn đồi\nThấy em nghiêng nghiêng cười trong đôi mắt tròn\nVà thế giới cũng nghiêng theo đôi bàn chân em (yeah, yeah)\nMấy đứa trẻ đi lên trường, đội trên đầu là đoá mây trắng (trắng)\nChân đạp lên mặt trời, môi thì cười và má hây nắng (nắng)\nNhững nụ cười làm cho lòng đang bộn bề bỗng hoá ngay ngắn\nLên trên này thấy các em, anh mới thấy mình quá may mắn\nMặt Trời vàng như trứng chiên\nKhi mà em đứng thẳng, núi và đồi phải đứng nghiêng (yeah)\nCon đường quanh co quá, em chao lượn như cánh chim\nMai sau lớn em bơi giữa đời, em bơi khoẻ như Ánh Viên (ha ha)\nDù không còn là học sinh, anh thấy mình vẫn còn phải học hành\nNhư cây mọc lên từ đất, phải đủ chất thì nó mới mọc cành\nHọc cách bón thêm hạnh phúc để cành đó mọc ra những điều lành\nVì anh nghĩ số phận là người luôn giám sát chứ không có điều hành (không có điều hành)\nNên anh mong các em sẽ không bao giờ bỏ cuộc (không)\nVì anh biết tụi em nhỏ con nhưng mà dũng khí thì không thể nào nhỏ được (that\'s right)\nYo, không thể nào mà nhỏ được!\nYo, không thể nào mà nhỏ được! (Uh)\nKìa mây, mây ngang đầu (kìa mây), kia núi, núi lô nhô (kìa núi)\nCùng em trên con đường (cùng em), đường bé xíu quanh co (quanh co, quanh co)\nBăng qua những ngọn đồi (sẵn sàng)\nThấy em nghiêng nghiêng cười trong đôi mắt tròn (tròn xoe)\nVà thế giới cũng nghiêng theo đôi bàn chân em (yeah)\nNấu cho các em ăn dù anh không là đầu bếp giỏi (he he)\nCũng là cách anh giúp chính mình bớt nghĩ suy cho đầu hết mỏi\nAnh muốn thấy những vị khách nhỏ ăn hết sạch những đồ ngon thơm\nVì anh biết những đứa trẻ này, mai này sẽ xây dựng quê hương (that\'s right)\nNấu cho các em ăn, em lấy sức nhặt từng con chữ (nhặt từng con chữ)\nKhi có tri thức em thấy con hổ không còn hung dữ (không)\nVà em sẽ lớn hơn cây mận ở bên vườn nhà\nLúc ấy thì mấy khe sâu chỉ là nét vẽ thêm rườm rà (ha ha)\nTụi mình muốn trở thành người tốt và đang phải học để làm điều đó (yeah)\nTụi mình nhìn các em để biết những gì mình cần, những gì mình có\nTụi mình cũng từng là trẻ thơ cần được no cái bụng về chiều (no)\nTụi mình tập tìm cách cho đi vì biết cho đi sẽ nhận về nhiều (nhận về nhiều)\nVì mình cho đi những nụ cười, những muộn phiền sẽ trôi rất xa (trôi rất xa)\nCho đi niềm hạnh phúc sẽ nhận về gấp đôi gấp ba, yeah (đôi gấp ba)\nCho đi niềm hạnh phúc sẽ nhận về gấp đôi gấp ba, gấp đôi gấp ba, yeah\nTrong đôi mắt đó em thấy bầu trời, em thấy núi đồi mặt hồ trong veo\nMong chân sẽ cứng và đá luôn mềm trên mỗi con đường từng ngày em qua\nMặt Trời trong trái tim hồng, vang trong lòng một tiếng gà trưa\nMong cho cây lá lên mầm, mong cho trời thuận gió hoà mưa\nKìa mây, mây ngang đầu, kia núi, núi lô nhô\nCùng em trên con đường, đường bé xíu quanh co\nBăng qua những ngọn đồi\nThấy em nghiêng nghiêng cười trong đôi mắt tròn\nVà thế giới cũng nghiêng theo đôi bàn chân em\nỞ dưới xuôi, chúng mình gọi view này là view triệu đô, vậy thì ai mới là người dư dả?\nChúng mình làm và làm và làm, cũng chỉ để mong có ngày được thư thả\nVà khi xem lại những hình ảnh này, những áp lực chợt biến tan\nNhững nụ cười mát như nước giếng khoan\nVà những đôi mắt trong như ngọn nguồn ánh sáng\nChúng mình đều phải học cách để tốt lên qua ngày qua tháng\nLúc ban đầu thì chả ai tốt ngay được vì chả biết phải làm sao\nThế là nhìn những người tốt quanh mình xem họ làm gì và làm theo\nVà người tốt thì ngoài kia nhiều lắm!\nTôi tin vậy, tôi biết vậy, Việt Nam!\nViết lại cho tôi lời bài hát trên mà không xuống hàng', '', '3:10', 7, 30, b'0'),
(5, 'Bạn đời ', 'https://i.scdn.co/image/ab67616d00001e027d405a233dff5392665e5a61', 'Kiếp trước có lẽ 2 ta yêu nhau mà chẳng thể thành vợ chồng\nNghĩ thoáng nên mai ra sao tụi mình cũng đều hài lòng\nCó thể hôm nay thương, có thể tương lai buông \nCó thể ta không giàu, miễn ở bên nhau vui không buồn \nChớp mắt 20-30 chiều nao rồi tụi mình cũng về già\nAi rồi sẽ phải trước sau theo 1 người cùng về nhà\nBước tiếp hay quên đi, nghĩ lắm chi thêm suy  \nTa cứ như bây giờ lo âu xa xôi để làm gì \n\nTa yêu là yêu vậy thôi…không có khái niệm đúng và sai\nMấy đứa hay nói lời khó nghe…bên nhau ta bỏ ngoài tai\nWe rolling overnight…không ai phải nghi ngờ ai\nKhông quan tâm bao nhiêu lần sai, chỉ cần em còn thương là anh vẫn ở lại.\nĐừng nói đến những thứ vốn quá lớn lao\nĐâu ai chắc ngày mai 2 ta sẽ chẳng thể bỏ nhau \nGiữ tim không hoài nghi bình yên trong ta sẽ đủ lâu\nCứ vô tư biết đâu ngày sau lại vui như tình đầu\n\nGặp gỡ trong tâm thế người dưng, chọn ở bên nhau vì bình yên\nQuá khứ, hiện tại là tình nguyện…tiếc là trên đời không gì là vĩnh viễn \nVì lời hứa không thắng nổi thời gian, trừ sự cố gắng cả 2 thì có thể\nNhưng nếu phải đặt 2 từ “trách nhiệm” xuống, liệu lòng chung thuỷ có bị làm khó dễ?\nBởi chúng ta cũng chỉ là người thường, may mắn gặp và trở thành người thương\nNên anh chẳng mong gì xa xôi ngoài sự tử tế nếu lỡ 1 người buông\nDù ở lại hay là lỡ thương ai, đừng dành nửa kia lòng thương hại\nCả khi điều vẫn nghĩ là “suốt đời” hồi đáp lại rằng không có tương lai\nKhi 1 mai tụi mình nhạt nhoà, ngọt ngào theo sau chẳng được như bấy lâu\nKhó đến mấy cứ nói 1 lời thật lòng rồi buông dù chỉ là mấy câu \nĐừng lo cho anh sẽ thấy đau\nCười nên dù không thể lấy nhau\nCả 2 có rơi xuống đáy sâu, tương lai chẳng thấy đâu\nVẫn vui như ngày đầu\nHãy thắp sáng hết những ngày còn lại\nNếu như thời gian bên nhau không còn dài\nNếu đến ngày phải buông tay, chỉ xin đừng quên hôm nay\nĐã từng biết nhau trên cõi đời này…\n\nKiếp trước có lẽ 2 ta yêu nhau mà chẳng thể thành vợ chồng\nNghĩ thoáng nên mai ra sao tụi mình cũng đều hài lòng\nCó thể hôm nay thương, có thể tương lai buông \nCó thể ta không giàu, miễn ở bên nhau vui không buồn \nChớp mắt 20-30 chiều nao rồi tụi mình cũng về già\nAi rồi sẽ phải trước sau theo 1 người cùng về nhà\nBước tiếp hay quên đi, nghĩ lắm chi thêm suy  \nTa cứ như bây giờ lo âu xa xôi để làm gì \n\nMỗi lần anh nghĩ về 2 từ bạn đời lại nở 1 nụ cười bất giác\nBởi vì anh thấy 2 từ này khó hiểu hơn cả mấy chuyện đất cát\nAnh đã từng muốn được là rapper và trở thành 1 người rất khác\nNhưng anh chưa từng nghĩ là một ngày anh sẽ sợ phải mất em nhiều hơn mất rap\nBởi vì mẹ nói…yêu có thể dễ, nhưng mà đâu dễ để con kiếm được bạn đời\nChung sống bên nhau, sinh con, đẻ cái, trăm năm thì đâu có thể là chuyện tạm thời\nAnh bắt đầu lo, khi em bước tới và làm anh muốn rước về làm dâu cả đời\nNhưng mà anh đúng hay anh sai trong chuyện đó thì chị “Tiên” bảo là thời gian mới biết câu trả lời\nNên em ơi em…em luôn rất yên bình, thật là xinh và thích thêu thùa\nKhông như tôi…luôn thô ráp bên ngoài và gặp ai cũng muốn trêu đùa\nVậy là sao! 1 người gầy và 1 người cao…\n1 người quen buông lời cay đắng lại va vào ngay 1 người ngọt ngào\nThế giới có thể đánh giá 2 đứa rất khác nhau, nhưng như vậy không đúng\nBởi vì tôi chỉ muốn thấy em, sau khi gặp công chúng\nCó những lúc tôi như muốn phát điên, em không hề than phiền\nNắm lấy cánh tay tôi đang run lên và trao tôi nụ cười ngoan hiền…\nThat’s why I love this girl…can you see? \nThat’s why I love this girl…can you see?\nBaby you love your man…I can see!\nThat we are meant to be…meant to be\n\nChớp mắt 20-30 chiều nao rồi tụi mình cũng về già\nAi rồi sẽ phải trước sau theo 1 người cùng về nhà', '', '5:00', 2, 0, b'0'),
(9, 'Hit Me Up', 'https://i.scdn.co/image/ab67616d00001e022103bdcdf1d4369f212b6862', 'áđá', 'áđá', 'áđá', NULL, 0, b'0'),
(10, 'À lôi', '/img/Rectangle 33.png', 'Tại vì thích em nhiều quá nhưng em lại nói là \"à lôi\"\nCũng định solo Hiphop cùng với trai bản nhưng mà thôi\nAnh gửi vào trong câu rap cho em dính cả thính, cả mồi\nNhà em có mấy quả đồi, ừ thì anh cũng tính cả rồi\nTại vì thích em nhiều quá nhưng em lại nói là \"à lôi\" (à lôi noọng)\nCũng định solo Hiphop cùng với trai bản nhưng mà thôi\nAnh gửi vào trong câu rap cho em dính cả thính cả mồi\nNhà em có tới mấy quả đồi ừ thì anh cũng tính cả rồi (à lôi noọng)\nGặp em ở thung lũng, ném quả còn lên không trung\nAnh bận đi tìm cảm hứng trong chuỗi ngày bị mông lung\nAnh cầm trên tay cây nỏ, ngắm vào tâm nhưng không trúng\nNhưng mà lỡ bị em gây thương nhớ, bắn vào tim mà không súng\nTrai bản em chơi đàn tính, còn anh thì gẩy guitar\nAnh thì không biết múa khèn nhưng mà giỏi quẩy Vina\nYêu em mấy núi cũng trèo mặc dù không giỏi đi xa\nAnh lại còn giỏi cả thi ca, biến homestay bản thành villa\nTấm lòng anh không phải thú dữ, không cần mổ bụng thì mới được xem\nMấy anh thanh niên trong bản phải biết uống rượu mới tán được em\nNhà sàn của em sẵn bậc nhưng nàng đồng ý mới có đường lên\nAnh thì số vốn đen đủi không biết lần này liệu có được hên\nỪ thì noọng ơi, à lôi\nHai chúng mình thì cùng đẹp nết, đẹp cả đôi\nHội trai bản để anh dẹp hết, chấp cả hội\nTrồng cây kín cả quả đồi, xong dắt em đi về nhà thôi\nƠi nọong ơi, ơi nọong ơi\nThương em mấy núi cũng trèo, mấy sông cũng lội, mấy đèo cũng qua\nNhà em ở ngay lưng đồi, nếu như có dịp mời chàng tới chơi\nTại vì thích em nhiều quá nhưng em lại nói là \"à lôi\"\nCũng định solo Hiphop cùng với trai bản nhưng mà thôi\nAnh gửi vào trong câu rap cho em dính cả thính, cả mồi\nNhà em có mấy quả đồi, ừ thì anh cũng tính cả rồi\nTại vì thích em nhiều quá nhưng em lại nói là \"à lôi\" (à lôi noọng)\nCũng định solo Hiphop cùng với trai bản nhưng mà thôi\nAnh gửi vào trong câu rap cho em dính cả thính, cả mồi\nNhà em có tới mấy quả đồi, ừ thì anh cũng tính cả rồi\nÀ lôi\nMột, hai, ba, yeah, nơng, thoong, tham\nĐây là người miền núi phía Bắc Việt Nam (Việt Nam)\nHiên ngang, không thích luồn cúi (hiên ngang)\nFlexing theo kiểu miền núi (flex, flex)\nTa chơi nhạc Trap, Hiphop trên bản làng\nBản này là bản chất, biến từ đất thành bản vàng\nTừ những ngày khó khăn, các dân tộc còn tản mạn\nĐến ngày chung tay cùng làm kinh tế, tiền chất đống như tải hàng\nVà ta đi lên từ bàn tay trắng (từ bàn tay trắng)\nCần cù chịu khó, không nhờ may mắn (không nhờ may mắn)\nTrải qua khó khăn một mưa hai nắng (một mưa hai nắng)\nNgười biết khiêm tốn là người hay thắng\nÀ lôi, à lôi\nNgười miền núi chất nói à lôi, à lôi\nHiền lành nhưng chiến như gà chọi, gà chọi\nỞ đây hay nói là à lôi, mọi người thường nói là à lôi\nÀ lôi, à lôi\nNgười miền núi chất nói à lôi, à lôi\nHiền lành nhưng chiến như gà chọi\nỞ đây hay nói là à lôi, mọi người thường nói là à lôi (à lôi)', '', '3:10', NULL, 0, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `UserName` varchar(20) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Image` text DEFAULT NULL,
  `DateOfBirth` varchar(30) DEFAULT NULL,
  `Role` bit(1) NOT NULL,
  `status` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `UserName`, `Email`, `Password`, `Image`, `DateOfBirth`, `Role`, `status`) VALUES
(1, 'Lê Quang Quốc Thịnh', 'lequanquocthinh95th@gmail.com', '123456', 'https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/326561071_844528049945998_2311888155981886301_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uNvoczv6qwgAX_8_po9&_nc_ht=scontent.fsgn2-11.fna&oh=00_AfCIH2TImgExHPICY_sOFWJ-wNP4XS39beS1kXRx8EFlmg&oe=65477F60', '08/11/2002', b'0', b'0'),
(3, 'Đào Xuân Cường', 'DaoXuanCuongth@gmail.com', '12345', '', '11/1/2002', b'1', b'0'),
(4, 'Võ Quốc Dinh', 'voquocdinh@gmail.com', '123456', 'IMG_4379.JPG', '08/11/2003', b'1', b'0'),
(13, 'Nguyễn Trần Tần Quy', 'nguyentrantanquy@gmail.com', 'asdasd', '', '22/12/2022', b'1', b'0'),
(16, 'Nguyễn Hoài Hân', 'nguyenhoaihan@gmail.com', '123456', '', '09/11/2002', b'1', b'0'),
(18, 'Đỗ Xuân Minh', 'doxuanminh@gmai.com', '123456', '', '2/1/2002', b'1', b'0'),
(19, 'Đào Lê Sang', 'daolesang@gmail.com', '1234556', '', '09/11/2002', b'1', b'1'),
(20, 'hihi', 'hello@gmail.com', 'thinh', '', '09-11-2002', b'1', b'1'),
(49, '123', 'lequanquocthinh95th@gmail.com', '123', NULL, '2002-02-22', b'1', NULL),
(50, 'voquocdinh', 'lequanquocthinh95th@gmail.com', '123', NULL, '2002-02-22', b'1', NULL),
(51, '123', 'lequanquocthinh95th@gmail.com', '123', NULL, '22/02/2002', b'1', NULL),
(52, '123', 'lequanquocthinh95th@gmail.com', '123', NULL, '22/02/2002', b'1', NULL),
(53, 'dinh', 'lequanquocthinh95th@gmail.com', '123', NULL, '2002-02-22', b'1', NULL),
(54, 'cương dẹp troai', 'cuomh@gmail.com', '123', NULL, '2002-02-22', b'1', NULL),
(55, 'cuong', 'cuogn123@gmail.com', '321', NULL, '2002-02-22', b'1', NULL),
(56, 'moe', 'meo@gmail.com', '123', NULL, '2002-02-22', b'1', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`AlbumID`),
  ADD KEY `FK_ArtistID` (`ArtistID`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`ArtistID`);

--
-- Indexes for table `artistssong`
--
ALTER TABLE `artistssong`
  ADD PRIMARY KEY (`ArtistID`,`SongID`),
  ADD KEY `SongID` (`SongID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `categorysong`
--
ALTER TABLE `categorysong`
  ADD PRIMARY KEY (`CategoryID`,`SongID`),
  ADD KEY `SongID` (`SongID`);

--
-- Indexes for table `favouritelist`
--
ALTER TABLE `favouritelist`
  ADD PRIMARY KEY (`FavouriteListID`),
  ADD KEY `FK_UserID` (`UserID`);

--
-- Indexes for table `favouritelistsong`
--
ALTER TABLE `favouritelistsong`
  ADD PRIMARY KEY (`FavouriteListID`,`SongID`),
  ADD KEY `SongID` (`SongID`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`HistoryID`),
  ADD KEY `FK_UserID` (`UserID`);

--
-- Indexes for table `historysong`
--
ALTER TABLE `historysong`
  ADD PRIMARY KEY (`SongID`,`HistoryID`),
  ADD KEY `HistoryID` (`HistoryID`);

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`PlaylistID`),
  ADD KEY `FK_UserID` (`UserID`);

--
-- Indexes for table `playlistsong`
--
ALTER TABLE `playlistsong`
  ADD PRIMARY KEY (`PlaylistID`,`SongID`),
  ADD KEY `SongID` (`SongID`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`SongID`),
  ADD KEY `FK_AlbumID` (`AlbumID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `AlbumID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `ArtistID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `favouritelist`
--
ALTER TABLE `favouritelist`
  MODIFY `FavouriteListID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `HistoryID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `playlist`
--
ALTER TABLE `playlist`
  MODIFY `PlaylistID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `SongID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `album_ibfk_1` FOREIGN KEY (`ArtistID`) REFERENCES `artists` (`ArtistID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `artistssong`
--
ALTER TABLE `artistssong`
  ADD CONSTRAINT `artistssong_ibfk_1` FOREIGN KEY (`ArtistID`) REFERENCES `artists` (`ArtistID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `artistssong_ibfk_2` FOREIGN KEY (`SongID`) REFERENCES `songs` (`SongID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `categorysong`
--
ALTER TABLE `categorysong`
  ADD CONSTRAINT `categorysong_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categorysong_ibfk_2` FOREIGN KEY (`SongID`) REFERENCES `songs` (`SongID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favouritelist`
--
ALTER TABLE `favouritelist`
  ADD CONSTRAINT `favouritelist_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favouritelist_ibfk_2` FOREIGN KEY (`FavouriteListID`) REFERENCES `favouritelistsong` (`FavouriteListID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favouritelistsong`
--
ALTER TABLE `favouritelistsong`
  ADD CONSTRAINT `favouritelistsong_ibfk_1` FOREIGN KEY (`SongID`) REFERENCES `songs` (`SongID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `historysong`
--
ALTER TABLE `historysong`
  ADD CONSTRAINT `historysong_ibfk_1` FOREIGN KEY (`HistoryID`) REFERENCES `history` (`HistoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historysong_ibfk_2` FOREIGN KEY (`SongID`) REFERENCES `songs` (`SongID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `playlistsong`
--
ALTER TABLE `playlistsong`
  ADD CONSTRAINT `playlistsong_ibfk_3` FOREIGN KEY (`PlaylistID`) REFERENCES `playlist` (`PlaylistID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `playlistsong_ibfk_4` FOREIGN KEY (`SongID`) REFERENCES `songs` (`SongID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`AlbumID`) REFERENCES `album` (`AlbumID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
