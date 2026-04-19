export interface Perfume {
  name: string
  brand: string
  nameKo?: string
}

/** 브랜드 한국어 이름 매핑 */
export const BRAND_KO: Record<string, string> = {
  // 럭셔리
  'Chanel':                    '샤넬',
  'Dior':                      '디올',
  'Yves Saint Laurent':        '입생로랑',
  'Giorgio Armani':            '조르지오 아르마니',
  'Lancôme':                   '랑콤',
  'Givenchy':                  '지방시',
  'Guerlain':                  '겔랑',
  'Hermès':                    '에르메스',
  'Cartier':                   '까르띠에',
  'Bvlgari':                   '불가리',
  'Van Cleef & Arpels':        '반클리프앤아펠',
  'Tiffany & Co':              '티파니',
  'Prada':                     '프라다',
  'Gucci':                     '구찌',
  'Valentino':                 '발렌티노',
  'Versace':                   '베르사체',
  'Burberry':                  '버버리',
  'Dolce & Gabbana':           '돌체앤가바나',
  'Bottega Veneta':            '보테가 베네타',
  'Balenciaga':                '발렌시아가',
  'Alexander McQueen':         '알렉산더 맥퀸',
  'Stella McCartney':          '스텔라 맥카트니',
  'Loewe':                     '로에베',
  // 뷰티/코스메틱
  'Estée Lauder':              '에스티 로더',
  'Elizabeth Arden':           '엘리자베스 아덴',
  'DKNY':                      '디케이엔와이',
  'Ralph Lauren':              '랄프 로렌',
  'Marc Jacobs':               '마크 제이콥스',
  'Michael Kors':              '마이클 코어스',
  'Kate Spade':                '케이트 스페이드',
  'Coach':                     '코치',
  'Jimmy Choo':                '지미 추',
  'Calvin Klein':              '캘빈클라인',
  'Hugo Boss':                 '휴고보스',
  'Davidoff':                  '다비도프',
  'Issey Miyake':              '이세이 미야케',
  'Kenzo':                     '겐조',
  'Thierry Mugler':            '티에리 뮈글레',
  'Viktor & Rolf':             '빅터앤롤프',
  'Narciso Rodriguez':         '나르시소 로드리게스',
  'Chloé':                     '끌로에',
  'Nina Ricci':                '니나 리치',
  'Cacharel':                  '카샤렐',
  'Lolita Lempicka':           '롤리타 렘피카',
  'Anna Sui':                  '안나수이',
  'Juicy Couture':             '쥬시꾸띄르',
  'Donna Karan':               '도나 카란',
  // 니치
  'Jo Malone':                 '조 말론',
  'Diptyque':                  '딥티크',
  'Maison Margiela':           '메종 마르지엘라',
  'Tom Ford':                  '톰 포드',
  'Byredo':                    '바이레도',
  'Le Labo':                   '르 라보',
  'Maison Francis Kurkdjian':  '메종 프란시스 커정',
  'Creed':                     '크리드',
  "Penhaligon's":              '펜할리곤스',
  'Acqua di Parma':            '아쿠아 디 파르마',
  'Frederic Malle':            '프레데릭 말',
  'Amouage':                   '아무아쥬',
  'Serge Lutens':              '세르쥬 루텐스',
  'Juliette Has a Gun':        '줄리엣 해즈 어 건',
  'Atelier Cologne':           '아뜰리에 코롱',
  'Comme des Garçons':         '꼼데가르송',
  'Memo Paris':                '메모 파리',
  'Vilhelm Parfumerie':        '빌헬름 파퓨머리',
  'Initio':                    '이니티오',
  'Xerjoff':                   '제르조프',
  'Montale':                   '몽탈',
  'Nasomatto':                 '나소마토',
  'Nishane':                   '니샤네',
  'Orto Parisi':               '오르토 파리시',
  'Etat Libre d\'Orange':      '에따 리브르 도랑쥬',
  'Zoologist':                 '주올로지스트',
  'Aesop':                     '이솝',
  'Commodity':                 '코모디티',
  // 라이프스타일
  'The Body Shop':             '더 바디샵',
  'Bath & Body Works':         '배스앤바디웍스',
  'Zara':                      '자라',
  'H&M':                       '에이치앤엠',
  'Muji':                      '무인양품',
  'Lush':                      '러쉬',
  'Sol de Janeiro':            '솔 드 자네이로',
  'Philosophy':                '필로소피',
  'Clean Reserve':             '클린 리저브',
  // 한국/아시아
  'Tamburins':                 '탬버린즈',
  'Granhand':                  '그란핸드',
  'Buly 1803':                 '뷜리 1803',
  "L'Artisan Parfumeur":      '로파피에',
  'Björk & Berries':          '비요크앤베리스',
  'Parfums de Marly':         '파팡 드 말리',
  'Mancera':                  '만세라',
  'Fragrance One':            '프래그런스 원',
  'Maison Crivelli':          '메종 크리벨리',
  'Laboratorio Olfattivo':    '라보라토리오 올파티보',
  'Goldfield & Banks':        '골드필드 앤 뱅크스',
  'Mizensir':                 '미장시르',
  // 기타
  '4711':                      '4711',
  'Roger & Gallet':            '로제 앤 갈레',
}

export const PERFUME_LIST: Perfume[] = [
  // ── Chanel ──────────────────────────────────────────────────
  { name: 'Chanel No.5',           brand: 'Chanel', nameKo: '샤넬 넘버파이브' },
  { name: 'Chanel No.19',          brand: 'Chanel', nameKo: '샤넬 넘버나인틴' },
  { name: 'Coco Mademoiselle',     brand: 'Chanel', nameKo: '코코 마드모아젤' },
  { name: 'Coco',                  brand: 'Chanel', nameKo: '코코' },
  { name: 'Chance',                brand: 'Chanel', nameKo: '찬스' },
  { name: 'Chance Eau Tendre',     brand: 'Chanel', nameKo: '찬스 오 텐드르' },
  { name: 'Chance Eau Fraîche',    brand: 'Chanel', nameKo: '찬스 오 프레쉬' },
  { name: 'Chance Eau Vive',       brand: 'Chanel', nameKo: '찬스 오 비브' },
  { name: 'Bleu de Chanel',        brand: 'Chanel', nameKo: '블루 드 샤넬' },
  { name: 'Allure',                brand: 'Chanel', nameKo: '알뤼르' },
  { name: 'Allure Homme Sport',    brand: 'Chanel', nameKo: '알뤼르 옴므 스포츠' },
  { name: 'Gabrielle',             brand: 'Chanel', nameKo: '가브리엘' },
  { name: 'Gabrielle Essence',     brand: 'Chanel', nameKo: '가브리엘 에센스' },
  { name: 'Les Exclusifs Sycomore',brand: 'Chanel', nameKo: '레 엑스클루시프 시코모어' },
  { name: 'Les Exclusifs Beige',   brand: 'Chanel', nameKo: '레 엑스클루시프 베이지' },
  { name: 'Les Exclusifs 31 Rue Cambon', brand: 'Chanel', nameKo: '31 뤼 캉봉' },
  { name: 'Égoïste',              brand: 'Chanel', nameKo: '에고이스트' },

  // ── Dior ────────────────────────────────────────────────────
  { name: 'Miss Dior',                   brand: 'Dior', nameKo: '미스 디올' },
  { name: 'Miss Dior Rose N\'Roses',     brand: 'Dior', nameKo: '미스 디올 로즈 앤 로지즈' },
  { name: "J'adore",                     brand: 'Dior', nameKo: '자도르' },
  { name: "J'adore L'Or",               brand: 'Dior', nameKo: '자도르 로르' },
  { name: "J'adore Infinissime",         brand: 'Dior', nameKo: '자도르 인피니심' },
  { name: 'Sauvage',                     brand: 'Dior', nameKo: '소바쥬' },
  { name: 'Sauvage Elixir',             brand: 'Dior', nameKo: '소바쥬 엘릭서' },
  { name: 'Sauvage Parfum',             brand: 'Dior', nameKo: '소바쥬 파팡' },
  { name: 'Dior Homme',                 brand: 'Dior', nameKo: '디올 옴므' },
  { name: 'Dior Homme Intense',         brand: 'Dior', nameKo: '디올 옴므 인텐스' },
  { name: 'Poison Girl',                brand: 'Dior', nameKo: '포이즌 걸' },
  { name: 'Hypnotic Poison',            brand: 'Dior', nameKo: '히프노틱 포이즌' },
  { name: 'Midnight Poison',            brand: 'Dior', nameKo: '미드나잇 포이즌' },
  { name: 'Lucky',                      brand: 'Dior', nameKo: '럭키' },
  { name: 'Dior Addict',               brand: 'Dior', nameKo: '디올 어딕트' },
  { name: 'Les Parfums Roses des Vents',brand: 'Dior' },
  { name: 'La Colle Noire',            brand: 'Dior' },

  // ── Yves Saint Laurent ──────────────────────────────────────
  { name: 'Black Opium',               brand: 'Yves Saint Laurent', nameKo: '블랙 오피움' },
  { name: 'Black Opium Intense',       brand: 'Yves Saint Laurent', nameKo: '블랙 오피움 인텐스' },
  { name: 'Black Opium Over Red',      brand: 'Yves Saint Laurent', nameKo: '블랙 오피움 오버 레드' },
  { name: 'Libre',                     brand: 'Yves Saint Laurent', nameKo: '리브레' },
  { name: 'Libre Intense',             brand: 'Yves Saint Laurent', nameKo: '리브레 인텐스' },
  { name: 'Mon Paris',                 brand: 'Yves Saint Laurent', nameKo: '몽 파리' },
  { name: 'Mon Paris Intensément',     brand: 'Yves Saint Laurent', nameKo: '몽 파리 엥탕스망' },
  { name: 'Y EDP',                     brand: 'Yves Saint Laurent' },
  { name: "La Nuit de L'Homme",        brand: 'Yves Saint Laurent', nameKo: '라 뉘 드 로므' },
  { name: 'Opium',                     brand: 'Yves Saint Laurent', nameKo: '오피움' },
  { name: 'Paris',                     brand: 'Yves Saint Laurent', nameKo: '파리' },
  { name: 'Manifesto',                 brand: 'Yves Saint Laurent', nameKo: '매니페스토' },

  // ── Giorgio Armani ──────────────────────────────────────────
  { name: 'Sì',                        brand: 'Giorgio Armani', nameKo: '씨' },
  { name: 'Sì Intense',               brand: 'Giorgio Armani', nameKo: '씨 인텐스' },
  { name: 'Sì Passione',              brand: 'Giorgio Armani', nameKo: '씨 파시오네' },
  { name: 'Sì Fiori',                 brand: 'Giorgio Armani', nameKo: '씨 피오리' },
  { name: 'My Way',                   brand: 'Giorgio Armani', nameKo: '마이 웨이' },
  { name: 'My Way Intense',           brand: 'Giorgio Armani', nameKo: '마이 웨이 인텐스' },
  { name: 'Acqua di Giò',            brand: 'Giorgio Armani', nameKo: '아쿠아 디 지오' },
  { name: 'Acqua di Giò Profondo',   brand: 'Giorgio Armani', nameKo: '아쿠아 디 지오 프로폰도' },
  { name: 'Acqua di Giò Profumo',    brand: 'Giorgio Armani', nameKo: '아쿠아 디 지오 프로푸모' },
  { name: 'Stronger With You',        brand: 'Giorgio Armani', nameKo: '스트롱거 위드 유' },
  { name: 'Stronger With You Intensely', brand: 'Giorgio Armani', nameKo: '스트롱거 위드 유 인텐슬리' },
  { name: 'Emporio Armani Diamonds',  brand: 'Giorgio Armani', nameKo: '엠포리오 아르마니 다이아몬즈' },

  // ── Lancôme ─────────────────────────────────────────────────
  { name: 'La Vie Est Belle',              brand: 'Lancôme', nameKo: '라비에벨' },
  { name: "La Vie Est Belle L'Éclat",     brand: 'Lancôme', nameKo: '라비에벨 레클라' },
  { name: "La Vie Est Belle En Rose",      brand: 'Lancôme', nameKo: '라비에벨 앙 로즈' },
  { name: 'La Vie Est Belle Intensément', brand: 'Lancôme', nameKo: '라비에벨 엥탕스망' },
  { name: 'Idôle',                        brand: 'Lancôme', nameKo: '이돌' },
  { name: 'Idôle Now',                    brand: 'Lancôme', nameKo: '이돌 나우' },
  { name: 'Trésor',                       brand: 'Lancôme', nameKo: '트레조' },
  { name: 'Miracle',                      brand: 'Lancôme', nameKo: '미라클' },
  { name: 'Hypnôse',                      brand: 'Lancôme', nameKo: '이프노즈' },
  { name: 'Magie Noire',                  brand: 'Lancôme', nameKo: '마지 누아르' },

  // ── Givenchy ────────────────────────────────────────────────
  { name: "L'Interdit",          brand: 'Givenchy', nameKo: '랑테르디' },
  { name: "L'Interdit Intense",  brand: 'Givenchy', nameKo: '랑테르디 인텐스' },
  { name: "L'Interdit Rouge",    brand: 'Givenchy', nameKo: '랑테르디 루즈' },
  { name: 'Irresistible',        brand: 'Givenchy', nameKo: '이레지스티블' },
  { name: 'Gentleman',           brand: 'Givenchy', nameKo: '젠틀맨' },
  { name: 'Gentleman Boisée',    brand: 'Givenchy', nameKo: '젠틀맨 부아제' },
  { name: 'Ange ou Démon',       brand: 'Givenchy', nameKo: '앙쥬 오 데몽' },
  { name: 'Amarige',             brand: 'Givenchy', nameKo: '아마리쥬' },
  { name: 'Pi',                  brand: 'Givenchy', nameKo: '파이' },
  { name: 'Organza',             brand: 'Givenchy', nameKo: '오르간자' },

  // ── Guerlain ────────────────────────────────────────────────
  { name: 'La Petite Robe Noire', brand: 'Guerlain', nameKo: '라 쁘띠 로브 누아르' },
  { name: 'Mon Guerlain',         brand: 'Guerlain', nameKo: '몽 겔랑' },
  { name: 'Mon Guerlain Bloom of Rose', brand: 'Guerlain', nameKo: '몽 겔랑 블룸 오브 로즈' },
  { name: 'Shalimar',             brand: 'Guerlain', nameKo: '샬리마' },
  { name: 'Shalimar Souffle de Parfum', brand: 'Guerlain', nameKo: '샬리마 수플레 드 파팡' },
  { name: "L'Homme Idéal",        brand: 'Guerlain', nameKo: '로므 이데알' },
  { name: 'Aqua Allegoria Bergamote Calabria', brand: 'Guerlain', nameKo: '아쿠아 알레고리아 베르가못' },
  { name: 'Aqua Allegoria Pera Granita', brand: 'Guerlain', nameKo: '아쿠아 알레고리아 페라 그라니타' },
  { name: 'Mitsouko',             brand: 'Guerlain', nameKo: '미쯔코' },
  { name: 'Jardins de Bagatelle', brand: 'Guerlain', nameKo: '자르댕 드 바가텔' },

  // ── Hermès ──────────────────────────────────────────────────
  { name: "Twilly d'Hermès",         brand: 'Hermès', nameKo: '뜨윌리 드 에르메스' },
  { name: "Twilly d'Hermès Eau Poivrée", brand: 'Hermès', nameKo: '뜨윌리 오 푸아브레' },
  { name: "Terre d'Hermès",          brand: 'Hermès', nameKo: '테르 드 에르메스' },
  { name: "Terre d'Hermès Parfum",   brand: 'Hermès', nameKo: '테르 드 에르메스 파팡' },
  { name: 'Un Jardin sur le Nil',    brand: 'Hermès', nameKo: '나일강의 정원' },
  { name: 'Un Jardin en Méditerranée', brand: 'Hermès', nameKo: '지중해의 정원' },
  { name: 'Eau des Merveilles',      brand: 'Hermès', nameKo: '오 드 메르베이' },
  { name: 'Eau des Merveilles Bleue',brand: 'Hermès', nameKo: '오 드 메르베이 블루' },
  { name: 'H24',                     brand: 'Hermès', nameKo: '에이치 트웬티포' },
  { name: 'Galop d\'Hermès',         brand: 'Hermès', nameKo: '갈로프 드 에르메스' },
  { name: 'Jour d\'Hermès',          brand: 'Hermès', nameKo: '쥬르 드 에르메스' },
  { name: 'Eau Claire des Merveilles', brand: 'Hermès', nameKo: '오 클레르 드 메르베이' },
  { name: 'Hiris',                   brand: 'Hermès' },
  { name: 'Kelly Calèche',           brand: 'Hermès' },

  // ── Cartier ─────────────────────────────────────────────────
  { name: 'La Panthère',            brand: 'Cartier', nameKo: '라 팡떼르' },
  { name: 'Carat',                  brand: 'Cartier', nameKo: '카라' },
  { name: 'Baiser Volé',            brand: 'Cartier', nameKo: '베제 볼레' },
  { name: 'Déclaration',            brand: 'Cartier', nameKo: '데클라라시옹' },
  { name: "L'Envol de Cartier",     brand: 'Cartier', nameKo: '랑볼 드 까르띠에' },
  { name: 'Santos de Cartier',      brand: 'Cartier', nameKo: '산토스 드 까르띠에' },

  // ── Bvlgari ─────────────────────────────────────────────────
  { name: 'Mon Jasmin Noir',        brand: 'Bvlgari', nameKo: '몽 자스민 누아르' },
  { name: 'Omnia Crystalline',      brand: 'Bvlgari', nameKo: '옴니아 크리스탈린' },
  { name: 'Omnia Amethyste',        brand: 'Bvlgari', nameKo: '옴니아 아메티스트' },
  { name: 'Rose Goldea',            brand: 'Bvlgari', nameKo: '로즈 골데아' },
  { name: 'Rose Goldea Blossom Delight', brand: 'Bvlgari', nameKo: '로즈 골데아 블로섬 딜라이트' },
  { name: 'Splendida Magnolia Sensuel', brand: 'Bvlgari', nameKo: '스플렌디다 마그놀리아 상수엘' },
  { name: 'Aqva Pour Homme',        brand: 'Bvlgari', nameKo: '아쿠아 뿌르 옴므' },
  { name: 'Man in Black',           brand: 'Bvlgari', nameKo: '맨 인 블랙' },

  // ── Van Cleef & Arpels ──────────────────────────────────────
  { name: 'Féerie',                 brand: 'Van Cleef & Arpels', nameKo: '페에리' },
  { name: 'Oriens',                 brand: 'Van Cleef & Arpels', nameKo: '오리앙' },
  { name: 'First',                  brand: 'Van Cleef & Arpels', nameKo: '퍼스트' },
  { name: 'Rêve',                   brand: 'Van Cleef & Arpels', nameKo: '레브' },

  // ── Tiffany & Co ────────────────────────────────────────────
  { name: 'Tiffany',                brand: 'Tiffany & Co', nameKo: '티파니' },
  { name: 'Tiffany Rose Gold',      brand: 'Tiffany & Co', nameKo: '티파니 로즈 골드' },
  { name: 'Tiffany Sheer',          brand: 'Tiffany & Co', nameKo: '티파니 쉬어' },

  // ── Jo Malone ───────────────────────────────────────────────
  { name: 'Peony & Blush Suede',       brand: 'Jo Malone', nameKo: '피오니 앤 블러쉬 스웨이드' },
  { name: 'English Pear & Freesia',    brand: 'Jo Malone', nameKo: '잉글리시 페어 앤 프리지아' },
  { name: 'Lime Basil & Mandarin',     brand: 'Jo Malone', nameKo: '라임 바질 앤 만다린' },
  { name: 'Wood Sage & Sea Salt',      brand: 'Jo Malone', nameKo: '우드 세이지 앤 씨 솔트' },
  { name: 'Pomegranate Noir',          brand: 'Jo Malone', nameKo: '포메그라네이트 누아르' },
  { name: 'Myrrh & Tonka',            brand: 'Jo Malone', nameKo: '몰약 앤 통카' },
  { name: 'Velvet Rose & Oud',         brand: 'Jo Malone', nameKo: '벨벳 로즈 앤 우드' },
  { name: 'Blackberry & Bay',          brand: 'Jo Malone', nameKo: '블랙베리 앤 베이' },
  { name: 'Red Roses',                 brand: 'Jo Malone', nameKo: '레드 로지스' },
  { name: 'Nectarine Blossom & Honey', brand: 'Jo Malone', nameKo: '넥타린 블로섬 앤 허니' },
  { name: 'Orange Blossom',            brand: 'Jo Malone', nameKo: '오렌지 블로섬' },
  { name: 'Mimosa & Cardamom',         brand: 'Jo Malone', nameKo: '미모사 앤 카다멈' },
  { name: 'English Oak & Redcurrant',  brand: 'Jo Malone', nameKo: '잉글리시 오크 앤 레드커런트' },
  { name: 'Honeysuckle & Davana',      brand: 'Jo Malone', nameKo: '허니석클 앤 다바나' },
  { name: 'Wild Bluebell',             brand: 'Jo Malone', nameKo: '와일드 블루벨' },
  { name: 'Rose & White Musk Absolu',  brand: 'Jo Malone', nameKo: '로즈 앤 화이트 머스크 앱솔루' },
  { name: 'Iris & White Musk',         brand: 'Jo Malone', nameKo: '아이리스 앤 화이트 머스크' },
  { name: 'Waterlily',                 brand: 'Jo Malone', nameKo: '워터릴리' },
  { name: 'Tuberose Angelica',         brand: 'Jo Malone', nameKo: '튜베로즈 앤젤리카' },
  { name: 'Incense & Cedrat',          brand: 'Jo Malone', nameKo: '인센스 앤 세드라' },
  { name: 'Scarlet Poppy',             brand: 'Jo Malone', nameKo: '스칼렛 포피' },

  // ── Diptyque ────────────────────────────────────────────────
  { name: 'Eau Rose',               brand: 'Diptyque', nameKo: '오 로즈' },
  { name: 'Do Son',                 brand: 'Diptyque', nameKo: '도 손' },
  { name: 'Philosykos',             brand: 'Diptyque', nameKo: '필로시코스' },
  { name: 'Tam Dao',                brand: 'Diptyque', nameKo: '탐 다오' },
  { name: 'Baies',                  brand: 'Diptyque', nameKo: '베' },
  { name: 'Olène',                  brand: 'Diptyque', nameKo: '올렌' },
  { name: 'Oyedo',                  brand: 'Diptyque', nameKo: '오예도' },
  { name: "L'Ombre Dans L'Eau",     brand: 'Diptyque', nameKo: '롬브르 당 로' },
  { name: 'Olfactif',               brand: 'Diptyque' },
  { name: 'Tempo',                  brand: 'Diptyque', nameKo: '뗌포' },
  { name: 'Eau Duelle',             brand: 'Diptyque', nameKo: '오 듀엘' },
  { name: 'Fleur de Peau',          brand: 'Diptyque', nameKo: '플뢰르 드 포' },
  { name: 'Orphéon',               brand: 'Diptyque', nameKo: '오르페옹' },
  { name: 'Volutes',                brand: 'Diptyque', nameKo: '볼뤼트' },
  { name: 'Eau Capitale',           brand: 'Diptyque', nameKo: '오 카피탈' },
  { name: 'Rosa Mundi',             brand: 'Diptyque', nameKo: '로자 문디' },
  { name: 'Eau de Lierre',          brand: 'Diptyque', nameKo: '오 드 리에르' },
  { name: 'Eau de Sens',            brand: 'Diptyque', nameKo: '오 드 썽' },
  { name: 'Ilio',                   brand: 'Diptyque', nameKo: '일리오' },
  { name: 'Ofresia',               brand: 'Diptyque', nameKo: '오프레지아' },
  { name: 'Vetyverio',             brand: 'Diptyque', nameKo: '베티베리오' },
  { name: 'Virgilio',              brand: 'Diptyque', nameKo: '비르질리오' },
  { name: 'Papier',                brand: 'Diptyque', nameKo: '파피에' },
  { name: 'Diptyque 34 Boulevard Saint Germain', brand: 'Diptyque', nameKo: '34 불바르 생 제르맹' },

  // ── Maison Margiela Replica ─────────────────────────────────
  { name: 'Replica Jazz Club',              brand: 'Maison Margiela', nameKo: '레플리카 재즈 클럽' },
  { name: 'Replica By the Fireplace',       brand: 'Maison Margiela', nameKo: '레플리카 바이 더 파이어플레이스' },
  { name: 'Replica Beach Walk',             brand: 'Maison Margiela', nameKo: '레플리카 비치 워크' },
  { name: 'Replica Flower Market',          brand: 'Maison Margiela', nameKo: '레플리카 플라워 마켓' },
  { name: 'Replica On a Date',              brand: 'Maison Margiela', nameKo: '레플리카 온 어 데이트' },
  { name: 'Replica Under the Lemon Trees',  brand: 'Maison Margiela', nameKo: '레플리카 언더 더 레몬 트리즈' },
  { name: 'Replica Bubble Bath',            brand: 'Maison Margiela', nameKo: '레플리카 버블 배스' },
  { name: "Replica At the Barber's",        brand: 'Maison Margiela', nameKo: '레플리카 앳 더 바버스' },
  { name: 'Replica Sailing Day',            brand: 'Maison Margiela', nameKo: '레플리카 세일링 데이' },
  { name: 'Replica Springtime in a Park',   brand: 'Maison Margiela', nameKo: '레플리카 스프링타임 인 어 파크' },
  { name: 'Replica When the Rain Stops',    brand: 'Maison Margiela', nameKo: '레플리카 웬 더 레인 스탑스' },
  { name: 'Replica Coffee Break',           brand: 'Maison Margiela', nameKo: '레플리카 커피 브레이크' },
  { name: 'Replica Whispers in the Library',brand: 'Maison Margiela', nameKo: '레플리카 위스퍼스 인 더 라이브러리' },

  // ── Tom Ford ────────────────────────────────────────────────
  { name: 'Black Orchid',       brand: 'Tom Ford', nameKo: '블랙 오키드' },
  { name: 'Tobacco Vanille',    brand: 'Tom Ford', nameKo: '토바코 바닐' },
  { name: 'Oud Wood',           brand: 'Tom Ford', nameKo: '우드 우드' },
  { name: 'Lost Cherry',        brand: 'Tom Ford', nameKo: '로스트 체리' },
  { name: 'Soleil Blanc',       brand: 'Tom Ford', nameKo: '솔레이 블랑' },
  { name: 'Neroli Portofino',   brand: 'Tom Ford', nameKo: '네롤리 포르토피노' },
  { name: 'Rose Prick',         brand: 'Tom Ford', nameKo: '로즈 프릭' },
  { name: 'Fucking Fabulous',   brand: 'Tom Ford', nameKo: '퍼킹 파블러스' },
  { name: 'Jasmin Rouge',       brand: 'Tom Ford', nameKo: '자스민 루즈' },
  { name: 'Santal Blush',       brand: 'Tom Ford', nameKo: '산탈 블러쉬' },
  { name: 'Velvet Orchid',      brand: 'Tom Ford', nameKo: '벨벳 오키드' },
  { name: 'White Suede',        brand: 'Tom Ford', nameKo: '화이트 스웨이드' },
  { name: 'Electric Cherry',    brand: 'Tom Ford', nameKo: '일렉트릭 체리' },
  { name: 'Bitter Peach',       brand: 'Tom Ford', nameKo: '비터 피치' },
  { name: 'Mandarino di Amalfi',brand: 'Tom Ford', nameKo: '만다리노 디 아말피' },
  { name: 'Costa Azzurra',      brand: 'Tom Ford', nameKo: '코스타 아주라' },
  { name: 'Ombre Leather',      brand: 'Tom Ford', nameKo: '옴브르 레더' },
  { name: 'Grey Vetiver',       brand: 'Tom Ford', nameKo: '그레이 베티버' },

  // ── Byredo ──────────────────────────────────────────────────
  { name: 'Gypsy Water',        brand: 'Byredo', nameKo: '집시 워터' },
  { name: "Bal d'Afrique",      brand: 'Byredo', nameKo: '발 다프리크' },
  { name: 'Mojave Ghost',       brand: 'Byredo', nameKo: '모하비 고스트' },
  { name: 'Super Cedar',        brand: 'Byredo', nameKo: '수퍼 시더' },
  { name: 'Bibliothèque',       brand: 'Byredo', nameKo: '비블리오떼크' },
  { name: 'Blanche',            brand: 'Byredo', nameKo: '블랑쉬' },
  { name: 'Inflorescence',      brand: 'Byredo', nameKo: '인플로레상스' },
  { name: 'Rose Noir & Ale',    brand: 'Byredo', nameKo: '로즈 누아르 앤 에일' },
  { name: 'Eleventh Hour',      brand: 'Byredo', nameKo: '일레븐스 아워' },
  { name: 'Young Rose',         brand: 'Byredo', nameKo: '영 로즈' },
  { name: '1996',               brand: 'Byredo', nameKo: '나인틴 나인티식스' },
  { name: 'Lil Fleur',          brand: 'Byredo', nameKo: '릴 플뢰르' },

  // ── Le Labo ─────────────────────────────────────────────────
  { name: 'Santal 33',     brand: 'Le Labo', nameKo: '산탈 서티쓰리' },
  { name: 'Rose 31',       brand: 'Le Labo', nameKo: '로즈 써티원' },
  { name: 'Another 13',    brand: 'Le Labo', nameKo: '어나더 써틴' },
  { name: 'Bergamote 22',  brand: 'Le Labo', nameKo: '베르가모트 트웬티투' },
  { name: 'Thé Noir 29',   brand: 'Le Labo', nameKo: '떼 누아르 트웬티나인' },
  { name: 'Ylang 49',      brand: 'Le Labo', nameKo: '일랑 포티나인' },
  { name: 'Patchouli 24',  brand: 'Le Labo', nameKo: '파출리 트웬티포' },
  { name: 'Labdanum 18',   brand: 'Le Labo', nameKo: '랍다넘 에이틴' },
  { name: 'Lys 41',        brand: 'Le Labo', nameKo: '리스 포티원' },
  { name: 'Oud 27',        brand: 'Le Labo', nameKo: '우드 트웬티세븐' },

  // ── Maison Francis Kurkdjian ────────────────────────────────
  { name: 'Baccarat Rouge 540',        brand: 'Maison Francis Kurkdjian', nameKo: '바카라 루즈 540' },
  { name: 'Baccarat Rouge 540 Extrait',brand: 'Maison Francis Kurkdjian', nameKo: '바카라 루즈 540 엑스트레' },
  { name: 'Aqua Universalis',          brand: 'Maison Francis Kurkdjian', nameKo: '아쿠아 유니베르살리스' },
  { name: 'À la Rose',                 brand: 'Maison Francis Kurkdjian', nameKo: '알라 로즈' },
  { name: 'Grand Soir',                brand: 'Maison Francis Kurkdjian', nameKo: '그랑 수아' },
  { name: 'Gentle Fluidity Gold',      brand: 'Maison Francis Kurkdjian', nameKo: '젠틀 플루이디티 골드' },
  { name: 'Gentle Fluidity Silver',    brand: 'Maison Francis Kurkdjian', nameKo: '젠틀 플루이디티 실버' },
  { name: 'OUD satin mood',            brand: 'Maison Francis Kurkdjian', nameKo: '우드 새틴 무드' },
  { name: '724',                       brand: 'Maison Francis Kurkdjian', nameKo: '세븐투포' },
  { name: 'Amyris Femme',              brand: 'Maison Francis Kurkdjian', nameKo: '아미리스 팜므' },
  { name: 'Amyris Homme',              brand: 'Maison Francis Kurkdjian', nameKo: '아미리스 옴므' },

  // ── Creed ───────────────────────────────────────────────────
  { name: 'Aventus',               brand: 'Creed', nameKo: '아벤투스' },
  { name: 'Aventus for Her',       brand: 'Creed', nameKo: '아벤투스 포 허' },
  { name: 'Green Irish Tweed',     brand: 'Creed', nameKo: '그린 아이리쉬 트위드' },
  { name: 'Silver Mountain Water', brand: 'Creed', nameKo: '실버 마운틴 워터' },
  { name: 'Virgin Island Water',   brand: 'Creed', nameKo: '버진 아일랜드 워터' },
  { name: 'Fleurs de Gardenia',    brand: 'Creed', nameKo: '플뢰르 드 가르데니아' },
  { name: 'Love in White',         brand: 'Creed', nameKo: '러브 인 화이트' },
  { name: 'Erolfa',                brand: 'Creed', nameKo: '에롤파' },
  { name: 'Wind Flowers',          brand: 'Creed', nameKo: '윈드 플라워스' },

  // ── Penhaligon's ────────────────────────────────────────────
  { name: 'Luna',                        brand: "Penhaligon's", nameKo: '루나' },
  { name: 'Halfeti',                     brand: "Penhaligon's", nameKo: '하프에티' },
  { name: 'Halfeti Leather',             brand: "Penhaligon's", nameKo: '하프에티 레더' },
  { name: 'Juniper Sling',               brand: "Penhaligon's", nameKo: '주니퍼 슬링' },
  { name: 'Empressa',                    brand: "Penhaligon's", nameKo: '엠프레사' },
  { name: 'Coveted Duchess Rose',        brand: "Penhaligon's", nameKo: '코비티드 더체스 로즈' },
  { name: 'Duchess Rose',                brand: "Penhaligon's", nameKo: '더체스 로즈' },
  { name: 'The Tragedy of Lord George',  brand: "Penhaligon's", nameKo: '더 트라제디 오브 로드 조지' },
  { name: 'Blenheim Bouquet',            brand: "Penhaligon's", nameKo: '블렌엄 부케' },
  { name: 'Quercus',                     brand: "Penhaligon's", nameKo: '쿼커스' },
  { name: 'Endymion',                    brand: "Penhaligon's", nameKo: '엔디미온' },
  { name: "Heartfelt Oud",               brand: "Penhaligon's", nameKo: '하트펠트 우드' },
  { name: 'Ostara',                      brand: "Penhaligon's", nameKo: '오스타라' },

  // ── Acqua di Parma ──────────────────────────────────────────
  { name: 'Colonia',                           brand: 'Acqua di Parma', nameKo: '콜로니아' },
  { name: 'Colonia Essenza',                   brand: 'Acqua di Parma', nameKo: '콜로니아 에센짜' },
  { name: 'Colonia Intensa',                   brand: 'Acqua di Parma', nameKo: '콜로니아 인텐사' },
  { name: 'Mirto di Panarea',                  brand: 'Acqua di Parma', nameKo: '미르토 디 파나레아' },
  { name: 'Blu Mediterraneo Arancia di Capri', brand: 'Acqua di Parma', nameKo: '아란치아 디 카프리' },
  { name: 'Blu Mediterraneo Fico di Amalfi',   brand: 'Acqua di Parma', nameKo: '피코 디 아말피' },
  { name: 'Blu Mediterraneo Bergamotto di Calabria', brand: 'Acqua di Parma', nameKo: '베르가못토 디 칼라브리아' },
  { name: 'Magnolia Nobile',                   brand: 'Acqua di Parma', nameKo: '마그놀리아 노빌레' },
  { name: 'Iris Nobile',                       brand: 'Acqua di Parma', nameKo: '이리스 노빌레' },
  { name: 'Rosa Nobile',                       brand: 'Acqua di Parma', nameKo: '로자 노빌레' },
  { name: 'Peonia Nobile',                     brand: 'Acqua di Parma', nameKo: '페오니아 노빌레' },
  { name: 'Quercia',                           brand: 'Acqua di Parma', nameKo: '쿠에르치아' },
  { name: 'Arancia di Capri',                  brand: 'Acqua di Parma', nameKo: '아란치아 디 카프리' },

  // ── The Body Shop ────────────────────────────────────────────
  { name: 'White Musk',                brand: 'The Body Shop', nameKo: '화이트 머스크' },
  { name: 'White Musk Florals',        brand: 'The Body Shop', nameKo: '화이트 머스크 플로럴스' },
  { name: 'White Musk L\'Eau',         brand: 'The Body Shop', nameKo: '화이트 머스크 로' },
  { name: 'Vineyard Peach',            brand: 'The Body Shop', nameKo: '비니어드 피치' },
  { name: 'Japanese Cherry Blossom',   brand: 'The Body Shop', nameKo: '재패니즈 체리 블로섬' },
  { name: 'English Dawn Musk',         brand: 'The Body Shop', nameKo: '잉글리시 던 머스크' },
  { name: 'British Rose',              brand: 'The Body Shop', nameKo: '브리티시 로즈' },
  { name: 'Vanilla & Tonka',           brand: 'The Body Shop', nameKo: '바닐라 앤 통카' },

  // ── Versace ─────────────────────────────────────────────────
  { name: 'Eros',                brand: 'Versace', nameKo: '에로스' },
  { name: 'Eros Flame',          brand: 'Versace', nameKo: '에로스 플레임' },
  { name: 'Eros Pour Femme',     brand: 'Versace', nameKo: '에로스 뿌르 팜므' },
  { name: 'Bright Crystal',      brand: 'Versace', nameKo: '브라이트 크리스탈' },
  { name: 'Bright Crystal Absolu', brand: 'Versace', nameKo: '브라이트 크리스탈 앱솔루' },
  { name: 'Dylan Blue',          brand: 'Versace', nameKo: '딜런 블루' },
  { name: 'Crystal Noir',        brand: 'Versace', nameKo: '크리스탈 누아르' },
  { name: 'Yellow Diamond',      brand: 'Versace', nameKo: '옐로우 다이아몬드' },
  { name: 'Versense',            brand: 'Versace', nameKo: '베르센스' },

  // ── Prada ───────────────────────────────────────────────────
  { name: 'Candy',              brand: 'Prada', nameKo: '캔디' },
  { name: 'Candy Florale',      brand: 'Prada', nameKo: '캔디 플로랄' },
  { name: 'Candy Kiss',         brand: 'Prada', nameKo: '캔디 키스' },
  { name: "L'Homme",            brand: 'Prada', nameKo: '로므' },
  { name: 'Paradoxe',           brand: 'Prada', nameKo: '파라독스' },
  { name: "Infusion d'Iris",    brand: 'Prada', nameKo: '인퓨전 드 이리스' },
  { name: "Infusion d'Iris Absolu", brand: 'Prada', nameKo: '인퓨전 드 이리스 앱솔루' },
  { name: 'Luna Rossa Ocean',   brand: 'Prada', nameKo: '루나 로사 오션' },
  { name: 'La Femme',           brand: 'Prada', nameKo: '라 팜므' },

  // ── Burberry ────────────────────────────────────────────────
  { name: 'Her',             brand: 'Burberry', nameKo: '허' },
  { name: 'Her Intense',     brand: 'Burberry', nameKo: '허 인텐스' },
  { name: 'Her Blossom',     brand: 'Burberry', nameKo: '허 블로섬' },
  { name: 'My Burberry',     brand: 'Burberry', nameKo: '마이 버버리' },
  { name: 'My Burberry Blush', brand: 'Burberry', nameKo: '마이 버버리 블러쉬' },
  { name: 'Brit Rhythm',     brand: 'Burberry', nameKo: '브릿 리듬' },
  { name: 'Mr. Burberry',    brand: 'Burberry', nameKo: '미스터 버버리' },
  { name: 'Goddess',         brand: 'Burberry', nameKo: '가디스' },

  // ── Marc Jacobs ─────────────────────────────────────────────
  { name: 'Daisy',           brand: 'Marc Jacobs', nameKo: '데이지' },
  { name: 'Daisy Dream',     brand: 'Marc Jacobs', nameKo: '데이지 드림' },
  { name: 'Daisy Love',      brand: 'Marc Jacobs', nameKo: '데이지 러브' },
  { name: 'Daisy Eau So Fresh', brand: 'Marc Jacobs', nameKo: '데이지 오 소 프레쉬' },
  { name: 'Decadence',       brand: 'Marc Jacobs', nameKo: '데카당스' },
  { name: 'Dot',             brand: 'Marc Jacobs', nameKo: '닷' },
  { name: 'Honey',           brand: 'Marc Jacobs', nameKo: '허니' },

  // ── Thierry Mugler ──────────────────────────────────────────
  { name: 'Angel',            brand: 'Thierry Mugler', nameKo: '엔젤' },
  { name: 'Angel Elixir',     brand: 'Thierry Mugler', nameKo: '엔젤 엘릭서' },
  { name: 'Angel Nova',       brand: 'Thierry Mugler', nameKo: '엔젤 노바' },
  { name: 'Alien',            brand: 'Thierry Mugler', nameKo: '에일리언' },
  { name: 'Alien Goddess',    brand: 'Thierry Mugler', nameKo: '에일리언 가디스' },
  { name: 'Alien Hypersense', brand: 'Thierry Mugler', nameKo: '에일리언 하이퍼센스' },
  { name: 'Mugler Cologne',   brand: 'Thierry Mugler', nameKo: '뮈글레 코롱' },

  // ── Viktor & Rolf ───────────────────────────────────────────
  { name: 'Flowerbomb',        brand: 'Viktor & Rolf', nameKo: '플라워밤' },
  { name: 'Flowerbomb Nectar', brand: 'Viktor & Rolf', nameKo: '플라워밤 넥타르' },
  { name: 'Flowerbomb Midnight', brand: 'Viktor & Rolf', nameKo: '플라워밤 미드나잇' },
  { name: 'Spicebomb',         brand: 'Viktor & Rolf', nameKo: '스파이스밤' },
  { name: 'Spicebomb Extreme', brand: 'Viktor & Rolf', nameKo: '스파이스밤 익스트림' },
  { name: 'Bonbon',            brand: 'Viktor & Rolf', nameKo: '봉봉' },
  { name: 'Good Fortune',      brand: 'Viktor & Rolf', nameKo: '굿 포춘' },

  // ── Narciso Rodriguez ───────────────────────────────────────
  { name: 'For Her',            brand: 'Narciso Rodriguez', nameKo: '포 허' },
  { name: 'For Her Musc Noir',  brand: 'Narciso Rodriguez', nameKo: '포 허 무스크 누아르' },
  { name: 'For Her Fleur Musc', brand: 'Narciso Rodriguez', nameKo: '포 허 플뢰르 뮤스크' },
  { name: 'Bleu Noir',          brand: 'Narciso Rodriguez', nameKo: '블루 누아르' },

  // ── Chloé ───────────────────────────────────────────────────
  { name: 'Chloé EDP',       brand: 'Chloé', nameKo: '끌로에' },
  { name: 'Chloé Intense',   brand: 'Chloé', nameKo: '끌로에 인텐스' },
  { name: 'Nomade',          brand: 'Chloé', nameKo: '노마드' },
  { name: 'Nomade Naturelle',brand: 'Chloé', nameKo: '노마드 나튀렐' },
  { name: 'Love Story',      brand: 'Chloé', nameKo: '러브 스토리' },
  { name: "L'Eau de Chloé",  brand: 'Chloé', nameKo: '로 드 끌로에' },
  { name: 'Atelier des Fleurs Hibiscus Abelmoschus', brand: 'Chloé' },

  // ── Valentino ───────────────────────────────────────────────
  { name: 'Donna Born in Roma',       brand: 'Valentino', nameKo: '도나 본 인 로마' },
  { name: 'Donna Born in Roma Coral Fantasy', brand: 'Valentino', nameKo: '도나 본 인 로마 코랄 판타지' },
  { name: 'Voce Viva',                brand: 'Valentino', nameKo: '보체 비바' },
  { name: 'Voce Viva Intensa',        brand: 'Valentino', nameKo: '보체 비바 인텐사' },
  { name: 'Uomo Intense',             brand: 'Valentino', nameKo: '우오모 인텐스' },
  { name: 'Valentino',                brand: 'Valentino', nameKo: '발렌티노' },

  // ── Gucci ───────────────────────────────────────────────────
  { name: 'Bloom',                  brand: 'Gucci', nameKo: '블룸' },
  { name: 'Bloom Ambrosia di Fiori',brand: 'Gucci', nameKo: '블룸 암브로시아 디 피오리' },
  { name: 'Bloom Profumo di Fiori', brand: 'Gucci', nameKo: '블룸 프로푸모 디 피오리' },
  { name: 'Guilty',                 brand: 'Gucci', nameKo: '길티' },
  { name: 'Guilty Absolute',        brand: 'Gucci', nameKo: '길티 앱솔루트' },
  { name: 'Flora Gorgeous Gardenia',brand: 'Gucci', nameKo: '플로라 고저스 가르데니아' },
  { name: 'Flora Gorgeous Jasmine', brand: 'Gucci', nameKo: '플로라 고저스 재스민' },
  { name: "Mémoire d'une Odeur",    brand: 'Gucci', nameKo: '메무아르 뒨 오되르' },
  { name: 'The Alchemist\'s Garden A Chant for the Nymph', brand: 'Gucci' },

  // ── Dolce & Gabbana ─────────────────────────────────────────
  { name: 'Light Blue',             brand: 'Dolce & Gabbana', nameKo: '라이트 블루' },
  { name: 'Light Blue Forever',     brand: 'Dolce & Gabbana', nameKo: '라이트 블루 포에버' },
  { name: 'Light Blue Intense',     brand: 'Dolce & Gabbana', nameKo: '라이트 블루 인텐스' },
  { name: 'The One',                brand: 'Dolce & Gabbana', nameKo: '더 원' },
  { name: 'The One Desire',         brand: 'Dolce & Gabbana', nameKo: '더 원 디자이어' },
  { name: "L'Imperatrice",          brand: 'Dolce & Gabbana', nameKo: '임페라트리체' },
  { name: 'Sicily',                 brand: 'Dolce & Gabbana', nameKo: '시실리' },
  { name: 'Velvet Rose & Oud',      brand: 'Dolce & Gabbana', nameKo: '벨벳 로즈 앤 우드' },

  // ── Calvin Klein ────────────────────────────────────────────
  { name: 'CK One',         brand: 'Calvin Klein', nameKo: '씨케이 원' },
  { name: 'CK Be',          brand: 'Calvin Klein', nameKo: '씨케이 비' },
  { name: 'CK Everyone',    brand: 'Calvin Klein', nameKo: '씨케이 에브리원' },
  { name: 'Eternity',       brand: 'Calvin Klein', nameKo: '이터니티' },
  { name: 'Eternity Now',   brand: 'Calvin Klein', nameKo: '이터니티 나우' },
  { name: 'Euphoria',       brand: 'Calvin Klein', nameKo: '유포리아' },
  { name: 'Euphoria Men',   brand: 'Calvin Klein', nameKo: '유포리아 맨' },
  { name: 'Obsession',      brand: 'Calvin Klein', nameKo: '옵세션' },
  { name: 'Contradiction',  brand: 'Calvin Klein', nameKo: '컨트라딕션' },
  { name: 'Deep Euphoria',  brand: 'Calvin Klein', nameKo: '딥 유포리아' },

  // ── Issey Miyake ────────────────────────────────────────────
  { name: "L'Eau d'Issey",         brand: 'Issey Miyake', nameKo: '로 디세이' },
  { name: "L'Eau d'Issey Pure",    brand: 'Issey Miyake', nameKo: '로 디세이 퓨어' },
  { name: "L'Eau d'Issey Florale", brand: 'Issey Miyake', nameKo: '로 디세이 플로랄' },
  { name: "Nuit d'Issey",          brand: 'Issey Miyake', nameKo: '뉘 디세이' },
  { name: "A Drop d'Issey",        brand: 'Issey Miyake', nameKo: '어 드롭 디세이' },
  { name: "A Drop d'Issey Sublime",brand: 'Issey Miyake', nameKo: '어 드롭 디세이 서블라임' },
  { name: 'Pleats Please',         brand: 'Issey Miyake', nameKo: '플리츠 플리즈' },

  // ── Davidoff ────────────────────────────────────────────────
  { name: 'Cool Water',        brand: 'Davidoff', nameKo: '쿨 워터' },
  { name: 'Cool Water Woman',  brand: 'Davidoff', nameKo: '쿨 워터 우먼' },
  { name: 'Cool Water Coral Reef', brand: 'Davidoff', nameKo: '쿨 워터 코랄 리프' },
  { name: 'The Game',          brand: 'Davidoff', nameKo: '더 게임' },

  // ── Hugo Boss ───────────────────────────────────────────────
  { name: 'BOSS Bottled',        brand: 'Hugo Boss', nameKo: '보스 보틀드' },
  { name: 'BOSS Bottled Infinite',brand: 'Hugo Boss', nameKo: '보스 보틀드 인피닛' },
  { name: 'BOSS The Scent',      brand: 'Hugo Boss', nameKo: '보스 더 센트' },
  { name: 'BOSS The Scent for Her', brand: 'Hugo Boss', nameKo: '보스 더 센트 포 허' },
  { name: 'Hugo Man',            brand: 'Hugo Boss', nameKo: '휴고 맨' },
  { name: 'BOSS Alive',          brand: 'Hugo Boss', nameKo: '보스 얼라이브' },

  // ── Kenzo ───────────────────────────────────────────────────
  { name: 'Flower by Kenzo',      brand: 'Kenzo', nameKo: '플라워 바이 겐조' },
  { name: 'Flower by Kenzo Poppy Bouquet', brand: 'Kenzo', nameKo: '플라워 바이 겐조 포피 부케' },
  { name: "L'Eau par Kenzo",      brand: 'Kenzo', nameKo: '로 파르 겐조' },
  { name: 'World',                brand: 'Kenzo', nameKo: '월드' },
  { name: 'Kenzoki',              brand: 'Kenzo', nameKo: '겐조키' },

  // ── Acqua di Parma (already above, skipping dupes) ──────────

  // ── Ralph Lauren ────────────────────────────────────────────
  { name: 'Romance',           brand: 'Ralph Lauren', nameKo: '로맨스' },
  { name: 'Romance Silver',    brand: 'Ralph Lauren', nameKo: '로맨스 실버' },
  { name: 'Polo Blue',         brand: 'Ralph Lauren', nameKo: '폴로 블루' },
  { name: 'Polo Red',          brand: 'Ralph Lauren', nameKo: '폴로 레드' },
  { name: 'Polo Green',        brand: 'Ralph Lauren', nameKo: '폴로 그린' },
  { name: 'Polo Black',        brand: 'Ralph Lauren', nameKo: '폴로 블랙' },
  { name: 'Ralph',             brand: 'Ralph Lauren', nameKo: '랄프' },

  // ── Estée Lauder ────────────────────────────────────────────
  { name: 'Beautiful',          brand: 'Estée Lauder', nameKo: '뷰티풀' },
  { name: 'Beautiful Magnolia', brand: 'Estée Lauder', nameKo: '뷰티풀 마그놀리아' },
  { name: 'Pleasures',          brand: 'Estée Lauder', nameKo: '플레저스' },
  { name: 'Modern Muse',        brand: 'Estée Lauder', nameKo: '모던 뮤즈' },
  { name: 'Youth Dew',          brand: 'Estée Lauder', nameKo: '유스 듀' },
  { name: 'White Linen',        brand: 'Estée Lauder', nameKo: '화이트 리넨' },
  { name: 'Intuition',          brand: 'Estée Lauder', nameKo: '인튜이션' },

  // ── Elizabeth Arden ─────────────────────────────────────────
  { name: 'Green Tea',           brand: 'Elizabeth Arden', nameKo: '그린 티' },
  { name: 'Green Tea Mimosa',    brand: 'Elizabeth Arden', nameKo: '그린 티 미모사' },
  { name: '5th Avenue',          brand: 'Elizabeth Arden', nameKo: '5번가' },
  { name: 'Red Door',            brand: 'Elizabeth Arden', nameKo: '레드 도어' },
  { name: 'White Tea',           brand: 'Elizabeth Arden', nameKo: '화이트 티' },
  { name: 'Sunflowers',          brand: 'Elizabeth Arden', nameKo: '선플라워스' },

  // ── DKNY ────────────────────────────────────────────────────
  { name: 'Be Delicious',           brand: 'DKNY', nameKo: '비 딜리셔스' },
  { name: 'Be Delicious Fresh Blossom', brand: 'DKNY', nameKo: '비 딜리셔스 프레쉬 블로섬' },
  { name: 'Be Extra Delicious',     brand: 'DKNY', nameKo: '비 엑스트라 딜리셔스' },
  { name: 'Stories',                brand: 'DKNY', nameKo: '스토리즈' },
  { name: 'My NY',                  brand: 'DKNY', nameKo: '마이 엔와이' },

  // ── Michael Kors ────────────────────────────────────────────
  { name: 'Sexy Amber',        brand: 'Michael Kors', nameKo: '섹시 앰버' },
  { name: 'Michael Kors',      brand: 'Michael Kors', nameKo: '마이클 코어스' },
  { name: 'Wonderlust',        brand: 'Michael Kors', nameKo: '원더러스트' },
  { name: 'Sparkling Blush',   brand: 'Michael Kors', nameKo: '스파클링 블러쉬' },

  // ── Kate Spade ──────────────────────────────────────────────
  { name: 'Live Colorfully',       brand: 'Kate Spade', nameKo: '리브 컬러풀리' },
  { name: 'In Full Bloom',         brand: 'Kate Spade', nameKo: '인 풀 블룸' },
  { name: 'Twirl',                 brand: 'Kate Spade', nameKo: '트월' },

  // ── Coach ───────────────────────────────────────────────────
  { name: 'Coach Floral',          brand: 'Coach', nameKo: '코치 플로럴' },
  { name: 'Dreams',                brand: 'Coach', nameKo: '드림스' },
  { name: 'Wild Rose',             brand: 'Coach', nameKo: '와일드 로즈' },
  { name: 'Coach',                 brand: 'Coach', nameKo: '코치' },

  // ── Jimmy Choo ──────────────────────────────────────────────
  { name: 'Jimmy Choo EDP',        brand: 'Jimmy Choo', nameKo: '지미 추' },
  { name: 'I Want Choo',           brand: 'Jimmy Choo', nameKo: '아이 원트 추' },
  { name: 'Seduction Collection Crystal', brand: 'Jimmy Choo', nameKo: '세덕션 크리스탈' },
  { name: 'Floral',                brand: 'Jimmy Choo', nameKo: '지미추 플로럴' },

  // ── Nina Ricci ──────────────────────────────────────────────
  { name: "L'Air du Temps",    brand: 'Nina Ricci', nameKo: '레르 뒤 탕' },
  { name: 'Nina',              brand: 'Nina Ricci', nameKo: '니나' },
  { name: 'Luna',              brand: 'Nina Ricci', nameKo: '루나' },
  { name: 'Fleur',             brand: 'Nina Ricci', nameKo: '플뢰르' },
  { name: 'Rose',              brand: 'Nina Ricci', nameKo: '로즈' },

  // ── Cacharel ────────────────────────────────────────────────
  { name: 'Anais Anais',       brand: 'Cacharel', nameKo: '아나이스 아나이스' },
  { name: 'Amor Amor',         brand: 'Cacharel', nameKo: '아모르 아모르' },
  { name: 'Noa',               brand: 'Cacharel', nameKo: '노아' },
  { name: 'Loulou',            brand: 'Cacharel', nameKo: '루루' },

  // ── Lolita Lempicka ─────────────────────────────────────────
  { name: 'Lolita Lempicka',    brand: 'Lolita Lempicka', nameKo: '롤리타 렘피카' },
  { name: 'Mon Premier Parfum', brand: 'Lolita Lempicka', nameKo: '몽 프르미에 파팡' },

  // ── Anna Sui ────────────────────────────────────────────────
  { name: 'Forbidden Affair',  brand: 'Anna Sui', nameKo: '포비든 어페어' },
  { name: 'Romantica',         brand: 'Anna Sui', nameKo: '로만티카' },
  { name: 'Flight of Fancy',   brand: 'Anna Sui', nameKo: '플라이트 오브 팬시' },

  // ── Juicy Couture ───────────────────────────────────────────
  { name: 'Viva la Juicy',      brand: 'Juicy Couture', nameKo: '비바 라 쥬시' },
  { name: 'Viva la Juicy Gold Couture', brand: 'Juicy Couture', nameKo: '비바 라 쥬시 골드 꾸뛰르' },

  // ── Donna Karan ─────────────────────────────────────────────
  { name: 'Cashmere Mist',     brand: 'Donna Karan', nameKo: '캐시미어 미스트' },
  { name: 'DKNY',              brand: 'Donna Karan', nameKo: '디케이엔와이' },

  // ── Frederic Malle ──────────────────────────────────────────
  { name: 'Portrait of a Lady',  brand: 'Frederic Malle', nameKo: '포트레이트 오브 어 레이디' },
  { name: 'Musc Ravageur',       brand: 'Frederic Malle', nameKo: '뮈스크 라바죄르' },
  { name: 'Carnal Flower',       brand: 'Frederic Malle', nameKo: '카날 플라워' },
  { name: 'Une Rose',            brand: 'Frederic Malle', nameKo: '윈 로즈' },
  { name: 'En Passant',          brand: 'Frederic Malle', nameKo: '앙 파상' },
  { name: 'Superstitious',       brand: 'Frederic Malle', nameKo: '수퍼스티셔스' },

  // ── Amouage ─────────────────────────────────────────────────
  { name: 'Interlude Man',       brand: 'Amouage', nameKo: '인터루드 맨' },
  { name: 'Reflection Woman',    brand: 'Amouage', nameKo: '리플렉션 우먼' },
  { name: 'Gold Woman',          brand: 'Amouage', nameKo: '골드 우먼' },
  { name: 'Memoir Woman',        brand: 'Amouage', nameKo: '메무아르 우먼' },
  { name: 'Journey Woman',       brand: 'Amouage', nameKo: '저니 우먼' },

  // ── Serge Lutens ────────────────────────────────────────────
  { name: 'Chergui',            brand: 'Serge Lutens', nameKo: '쉐르기' },
  { name: 'Ambre Sultan',       brand: 'Serge Lutens', nameKo: '앙브르 술탕' },
  { name: 'Feminité du Bois',   brand: 'Serge Lutens', nameKo: '페미니떼 뒤 부아' },
  { name: 'Un Bois Vanille',    brand: 'Serge Lutens', nameKo: '엉 부아 바닐' },
  { name: 'Bas de Soie',        brand: 'Serge Lutens', nameKo: '바 드 수아' },

  // ── Juliette Has a Gun ──────────────────────────────────────
  { name: 'Not a Perfume',       brand: 'Juliette Has a Gun', nameKo: '낫 어 퍼퓸' },
  { name: 'Lady Vengeance',      brand: 'Juliette Has a Gun', nameKo: '레이디 벤전스' },
  { name: 'Romantina',           brand: 'Juliette Has a Gun', nameKo: '로만티나' },
  { name: 'Anyway',              brand: 'Juliette Has a Gun', nameKo: '애니웨이' },
  { name: 'Musc Invisible',      brand: 'Juliette Has a Gun', nameKo: '뮤스크 인비지블' },

  // ── Atelier Cologne ─────────────────────────────────────────
  { name: 'Cologne Absolue Rose Anonyme', brand: 'Atelier Cologne', nameKo: '로즈 아노님' },
  { name: 'Clementine California',  brand: 'Atelier Cologne', nameKo: '클레멘타인 캘리포니아' },
  { name: 'Orange Sanguine',        brand: 'Atelier Cologne', nameKo: '오랑쥬 상긴' },
  { name: 'Oolang Infini',          brand: 'Atelier Cologne', nameKo: '울롱 인피니' },
  { name: 'Vanille Insensée',       brand: 'Atelier Cologne', nameKo: '바닐 엥상세' },

  // ── Comme des Garçons ───────────────────────────────────────
  { name: 'Wonderwood',         brand: 'Comme des Garçons', nameKo: '원더우드' },
  { name: 'Blackpepper',        brand: 'Comme des Garçons', nameKo: '블랙페퍼' },
  { name: 'Avignon',            brand: 'Comme des Garçons', nameKo: '아비뇽' },
  { name: 'Hinoki',             brand: 'Comme des Garçons', nameKo: '히노키' },
  { name: '2 Man',              brand: 'Comme des Garçons', nameKo: '투 맨' },
  { name: 'Concrete',           brand: 'Comme des Garçons', nameKo: '콘크리트' },

  // ── Vilhelm Parfumerie ──────────────────────────────────────
  { name: 'Basilico & Fellini', brand: 'Vilhelm Parfumerie', nameKo: '바질리코 앤 펠리니' },
  { name: 'Mango Skin',         brand: 'Vilhelm Parfumerie', nameKo: '망고 스킨' },
  { name: 'Dear Polly',         brand: 'Vilhelm Parfumerie', nameKo: '디어 폴리' },

  // ── Initio ──────────────────────────────────────────────────
  { name: 'Oud for Greatness',    brand: 'Initio', nameKo: '우드 포 그레이트니스' },
  { name: 'Atomic Rose',          brand: 'Initio', nameKo: '아토믹 로즈' },
  { name: 'Rehab',                brand: 'Initio', nameKo: '리합' },
  { name: 'Side Effect',          brand: 'Initio', nameKo: '사이드 이펙트' },

  // ── Xerjoff ─────────────────────────────────────────────────
  { name: 'Naxos',              brand: 'Xerjoff', nameKo: '낙소스' },
  { name: 'Nio',                brand: 'Xerjoff', nameKo: '니오' },
  { name: 'Casamorati Lira',    brand: 'Xerjoff', nameKo: '카사모라티 리라' },

  // ── Montale ─────────────────────────────────────────────────
  { name: 'Black Aoud',         brand: 'Montale', nameKo: '블랙 아우드' },
  { name: 'Intense Café',       brand: 'Montale', nameKo: '인텐스 카페' },
  { name: 'Roses Musk',         brand: 'Montale', nameKo: '로지스 머스크' },
  { name: 'Vanilla Extasy',     brand: 'Montale', nameKo: '바닐라 엑스터시' },
  { name: 'Starry Nights',      brand: 'Montale', nameKo: '스타리 나이츠' },

  // ── Nishane ─────────────────────────────────────────────────
  { name: 'Hacivat',            brand: 'Nishane', nameKo: '하지밧' },
  { name: 'Ani',                brand: 'Nishane', nameKo: '아니' },
  { name: 'Fan Your Flames',    brand: 'Nishane', nameKo: '팬 유어 플레임스' },
  { name: 'Wulong Cha',         brand: 'Nishane', nameKo: '우롱차' },

  // ── Nasomatto ───────────────────────────────────────────────
  { name: 'Black Afgano',       brand: 'Nasomatto', nameKo: '블랙 아프가노' },
  { name: 'Narcotic Venus',     brand: 'Nasomatto', nameKo: '나르코틱 비너스' },
  { name: 'Duro',               brand: 'Nasomatto', nameKo: '두로' },
  { name: 'Baraonda',           brand: 'Nasomatto', nameKo: '바라온다' },

  // ── Aesop ───────────────────────────────────────────────────
  { name: 'Hwyl',               brand: 'Aesop', nameKo: '흐윌' },
  { name: 'Tacit',              brand: 'Aesop', nameKo: '타싯' },
  { name: 'Marrakech Intense',  brand: 'Aesop', nameKo: '마라케쉬 인텐스' },
  { name: 'Karst',              brand: 'Aesop', nameKo: '카르스트' },
  { name: 'Miraceti',           brand: 'Aesop', nameKo: '미라세티' },

  // ── Commodity ───────────────────────────────────────────────
  { name: 'Moss',               brand: 'Commodity', nameKo: '모스' },
  { name: 'Milk',               brand: 'Commodity', nameKo: '밀크' },
  { name: 'Gold',               brand: 'Commodity', nameKo: '골드' },
  { name: 'Vetiver',            brand: 'Commodity', nameKo: '베티버' },
  { name: 'Coriander',          brand: 'Commodity', nameKo: '코리앤더' },

  // ── Sol de Janeiro ──────────────────────────────────────────
  { name: 'Brazilian Crush Cheirosa 62', brand: 'Sol de Janeiro', nameKo: '브라질리안 크러쉬 쉐이로사 62' },
  { name: 'Brazilian Crush Cheirosa 68', brand: 'Sol de Janeiro', nameKo: '브라질리안 크러쉬 쉐이로사 68' },
  { name: 'Coco Cabana Crush',           brand: 'Sol de Janeiro', nameKo: '코코 카바나 크러쉬' },

  // ── Zara ────────────────────────────────────────────────────
  { name: 'Emotions Amber',     brand: 'Zara', nameKo: '이모션스 앰버' },
  { name: 'Emotions Vetiver',   brand: 'Zara', nameKo: '이모션스 베티버' },
  { name: 'Rose Gourmand',      brand: 'Zara', nameKo: '로즈 구르망' },
  { name: 'Gardenia',           brand: 'Zara', nameKo: '가르데니아' },
  { name: 'Black Peony',        brand: 'Zara', nameKo: '블랙 피오니' },
  { name: 'Frosted Cherry',     brand: 'Zara', nameKo: '프로스티드 체리' },

  // ── Lush ────────────────────────────────────────────────────
  { name: 'Lust',               brand: 'Lush', nameKo: '러스트' },
  { name: 'Vanillary',          brand: 'Lush', nameKo: '바닐러리' },
  { name: 'Karma',              brand: 'Lush', nameKo: '카르마' },
  { name: 'Imogen Rose',        brand: 'Lush', nameKo: '이모젠 로즈' },
  { name: 'Twilight',           brand: 'Lush', nameKo: '트와일라잇' },

  // ── Philosophy ──────────────────────────────────────────────
  { name: 'Amazing Grace',      brand: 'Philosophy', nameKo: '어메이징 그레이스' },
  { name: 'Pure Grace',         brand: 'Philosophy', nameKo: '퓨어 그레이스' },
  { name: 'Falling in Love',    brand: 'Philosophy', nameKo: '폴링 인 러브' },

  // ── Clean Reserve ───────────────────────────────────────────
  { name: 'Warm Cotton',        brand: 'Clean Reserve', nameKo: '웜 코튼' },
  { name: 'Reserve Blonde Rose',brand: 'Clean Reserve', nameKo: '리저브 블론드 로즈' },
  { name: 'Sel Santal',         brand: 'Clean Reserve', nameKo: '셀 산탈' },
  { name: 'Sueded Oud',         brand: 'Clean Reserve', nameKo: '스웨이드드 우드' },

  // ── Loewe ───────────────────────────────────────────────────
  { name: 'Aura',               brand: 'Loewe', nameKo: '아우라' },
  { name: 'Aura Floral',        brand: 'Loewe', nameKo: '아우라 플로럴' },
  { name: '001 Woman',          brand: 'Loewe', nameKo: '001 우먼' },
  { name: 'Solo',               brand: 'Loewe', nameKo: '솔로' },
  { name: 'Solo Ella',          brand: 'Loewe', nameKo: '솔로 엘라' },
  { name: 'Paule',              brand: 'Loewe', nameKo: '폴' },
  { name: 'Aire',               brand: 'Loewe', nameKo: '아이레' },

  // ── Bottega Veneta ──────────────────────────────────────────
  { name: 'Bottega Veneta EDP', brand: 'Bottega Veneta', nameKo: '보테가 베네타' },
  { name: 'Knot',               brand: 'Bottega Veneta', nameKo: '낫' },
  { name: 'Illusione',          brand: 'Bottega Veneta', nameKo: '일루시오네' },

  // ── Stella McCartney ────────────────────────────────────────
  { name: 'Stella',             brand: 'Stella McCartney', nameKo: '스텔라' },
  { name: 'Peony',              brand: 'Stella McCartney', nameKo: '피오니' },

  // ── Balenciaga ──────────────────────────────────────────────
  { name: 'Florabotanica',      brand: 'Balenciaga', nameKo: '플로라보타니카' },
  { name: 'Rosabotanica',       brand: 'Balenciaga', nameKo: '로사보타니카' },
  { name: 'B Skin',             brand: 'Balenciaga', nameKo: '비 스킨' },

  // ── Tamburins ───────────────────────────────────────────────
  { name: 'Tamburins Chamo',    brand: 'Tamburins', nameKo: '탬버린즈 카모' },
  { name: 'Tamburins Shell',    brand: 'Tamburins', nameKo: '탬버린즈 쉘' },
  { name: 'Tamburins Grain',    brand: 'Tamburins', nameKo: '탬버린즈 그레인' },
  { name: 'Tamburins Pepper',   brand: 'Tamburins', nameKo: '탬버린즈 페퍼' },
  { name: 'Tamburins Smoke',    brand: 'Tamburins', nameKo: '탬버린즈 스모크' },

  // ── Granhand ────────────────────────────────────────────────
  { name: 'Granhand Peach Cobbler', brand: 'Granhand', nameKo: '그란핸드 피치 코블러' },
  { name: 'Granhand Morné',         brand: 'Granhand', nameKo: '그란핸드 모르네' },
  { name: 'Granhand Neroli',        brand: 'Granhand', nameKo: '그란핸드 네롤리' },

  // ── Muji ────────────────────────────────────────────────────
  { name: 'Muji Yuzu',          brand: 'Muji', nameKo: '무지 유자' },
  { name: 'Muji Floral Green',  brand: 'Muji', nameKo: '무지 플로럴 그린' },
  { name: 'Muji Woody',         brand: 'Muji', nameKo: '무지 우디' },

  // ── 4711 ────────────────────────────────────────────────────
  { name: '4711 Original Eau de Cologne', brand: '4711', nameKo: '4711 오리지날 오 드 코롱' },
  { name: '4711 Acqua Colonia Lemon',     brand: '4711', nameKo: '4711 아쿠아 콜로니아 레몬' },

  // ── L'Artisan Parfumeur ─────────────────────────────────────
  { name: "Mûre et Musc",              brand: "L'Artisan Parfumeur", nameKo: '뮈르 에 뮈스크' },
  { name: "Mûre et Musc Extrême",      brand: "L'Artisan Parfumeur", nameKo: '뮈르 에 뮈스크 엑스트렘' },
  { name: "Jour de Fête",              brand: "L'Artisan Parfumeur", nameKo: '주르 드 페트' },
  { name: "Drôle de Rose",             brand: "L'Artisan Parfumeur", nameKo: '드롤 드 로즈' },
  { name: "La Haie Fleurie du Hameau", brand: "L'Artisan Parfumeur", nameKo: '라 에 플뢰리 뒤 아모' },
  { name: "Traversée du Bosphore",     brand: "L'Artisan Parfumeur", nameKo: '트라베르세 뒤 보스포르' },
  { name: "Passage d'Enfer",          brand: "L'Artisan Parfumeur", nameKo: '파사쥬 당페르' },
  { name: "Caligna",                   brand: "L'Artisan Parfumeur", nameKo: '칼리냐' },
  { name: "Séville à l'Aube",         brand: "L'Artisan Parfumeur", nameKo: '세빌 아 로브' },
  { name: "Zeste de Gingembre",        brand: "L'Artisan Parfumeur", nameKo: '제스트 드 쟁장브르' },
  { name: "Fou d'Absinthe",            brand: "L'Artisan Parfumeur", nameKo: '푸 답상트' },
  { name: "Timbuktu",                  brand: "L'Artisan Parfumeur", nameKo: '팀북투' },

  // ── Björk & Berries ─────────────────────────────────────────
  { name: 'Fjällskog',                 brand: 'Björk & Berries', nameKo: '피얄쇠' },
  { name: 'White Forest',              brand: 'Björk & Berries', nameKo: '화이트 포레스트' },
  { name: 'Snow',                      brand: 'Björk & Berries', nameKo: '스노우' },
  { name: 'Smoky Forest',              brand: 'Björk & Berries', nameKo: '스모키 포레스트' },
  { name: 'Nordic Wild',               brand: 'Björk & Berries', nameKo: '노르딕 와일드' },
  { name: 'Forêt Noire',              brand: 'Björk & Berries', nameKo: '포레 누아르' },

  // ── Parfums de Marly ────────────────────────────────────────
  { name: 'Delina',                    brand: 'Parfums de Marly', nameKo: '델리나' },
  { name: 'Delina La Rosée',          brand: 'Parfums de Marly', nameKo: '델리나 라 로제' },
  { name: 'Pegasus',                   brand: 'Parfums de Marly', nameKo: '페가수스' },
  { name: 'Pegasus Exclusif',         brand: 'Parfums de Marly', nameKo: '페가수스 엑스클루시프' },
  { name: 'Herod',                     brand: 'Parfums de Marly', nameKo: '헤로드' },
  { name: 'Layton',                    brand: 'Parfums de Marly', nameKo: '레이튼' },
  { name: 'Layton Exclusif',          brand: 'Parfums de Marly', nameKo: '레이튼 엑스클루시프' },
  { name: 'Cassili',                   brand: 'Parfums de Marly', nameKo: '카실리' },
  { name: 'Althair',                   brand: 'Parfums de Marly', nameKo: '알타이르' },
  { name: 'Percival',                  brand: 'Parfums de Marly', nameKo: '퍼시발' },
  { name: 'Sedley',                    brand: 'Parfums de Marly', nameKo: '세들리' },
  { name: 'Safanad',                   brand: 'Parfums de Marly', nameKo: '사파나드' },
  { name: 'Oriana',                    brand: 'Parfums de Marly', nameKo: '오리아나' },

  // ── Mancera ─────────────────────────────────────────────────
  { name: 'Cedrat Boise',              brand: 'Mancera', nameKo: '세드라 부아제' },
  { name: 'Wild Fruits',               brand: 'Mancera', nameKo: '와일드 프루츠' },
  { name: 'Red Tobacco',               brand: 'Mancera', nameKo: '레드 타바코' },
  { name: 'Roses Vanille',             brand: 'Mancera', nameKo: '로즈 바닐' },
  { name: 'Aoud Lemon Mint',           brand: 'Mancera', nameKo: '아우드 레몬 민트' },
  { name: 'Black To Black',            brand: 'Mancera', nameKo: '블랙 투 블랙' },
  { name: 'Paris-Moscou',              brand: 'Mancera', nameKo: '파리 모스코' },
  { name: 'Instant Crush',             brand: 'Mancera', nameKo: '인스턴트 크러쉬' },
  { name: 'Silver Wood',               brand: 'Mancera', nameKo: '실버 우드' },
  { name: 'Amber & Roses',             brand: 'Mancera', nameKo: '앰버 앤 로즈' },

  // ── Buly 1803 ───────────────────────────────────────────────
  { name: 'Buly Marquise de Pompadour', brand: 'Buly 1803', nameKo: '뷜리 마르키즈 드 퐁파두르' },
  { name: 'Buly Vinaigre de Toilette', brand: 'Buly 1803', nameKo: '뷜리 비네그르 드 투알레트' },
  { name: 'Buly Bois Santal',          brand: 'Buly 1803', nameKo: '뷜리 부아 상탈' },
  { name: 'Buly Jardin du Roi',        brand: 'Buly 1803', nameKo: '뷜리 자르댕 뒤 루아' },
  { name: 'Buly Eau Triple Fleurs d\'Oranger', brand: 'Buly 1803', nameKo: '뷜리 오 트리플 플뢰르 도랑제' },

  // ── Orto Parisi ─────────────────────────────────────────────
  { name: 'Megamare',                  brand: 'Orto Parisi', nameKo: '메가마레' },
  { name: 'Boccanera',                 brand: 'Orto Parisi', nameKo: '보카네라' },
  { name: 'Stercus',                   brand: 'Orto Parisi', nameKo: '스테르쿠스' },
  { name: 'Seminalis',                 brand: 'Orto Parisi', nameKo: '세미날리스' },
  { name: 'Terroni',                   brand: 'Orto Parisi', nameKo: '테로니' },

  // ── Zoologist ───────────────────────────────────────────────
  { name: 'Hummingbird',               brand: 'Zoologist', nameKo: '허밍버드' },
  { name: 'Bee',                       brand: 'Zoologist', nameKo: '비' },
  { name: 'Elephant',                  brand: 'Zoologist', nameKo: '엘리펀트' },
  { name: 'Beaver',                    brand: 'Zoologist', nameKo: '비버' },
  { name: 'Dragonfly',                 brand: 'Zoologist', nameKo: '드래곤플라이' },
  { name: 'Moth',                      brand: 'Zoologist', nameKo: '모스' },

  // ── Memo Paris ──────────────────────────────────────────────
  { name: 'Irish Leather',             brand: 'Memo Paris', nameKo: '아이리시 레더' },
  { name: 'French Leather',            brand: 'Memo Paris', nameKo: '프렌치 레더' },
  { name: 'Inle',                      brand: 'Memo Paris', nameKo: '인레' },
  { name: 'Africa Olifants',           brand: 'Memo Paris', nameKo: '아프리카 올리판트' },
  { name: 'Shiso Garden',              brand: 'Memo Paris', nameKo: '시소 가든' },
  { name: 'Corfu',                     brand: 'Memo Paris', nameKo: '코르푸' },
  { name: 'Lalibela',                  brand: 'Memo Paris', nameKo: '랄리벨라' },
]

// ── 퍼지 검색 유틸 ──────────────────────────────────────────────

/** 소문자 변환 + 공백 전부 제거 */
function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '')
}

/**
 * 편집 거리 (Levenshtein).
 * O(a.length × b.length) — 짧은 향수 이름 수준에서는 충분히 빠름.
 */
function editDistance(a: string, b: string): number {
  const m = a.length, n = b.length
  if (m === 0) return n
  if (n === 0) return m
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    const curr: number[] = [i]
    for (let j = 1; j <= n; j++) {
      curr[j] = a[i - 1] === b[j - 1]
        ? prev[j - 1]
        : 1 + Math.min(prev[j], curr[j - 1], prev[j - 1])
    }
    prev = curr
  }
  return prev[n]
}

/**
 * 공백 제거 정규화 후 퍼지 부분 일치.
 * ① 정규화된 text에 query 포함 → 즉시 true
 * ② 슬라이딩 윈도우(query 길이)로 editDistance ≤ maxErr 구간 탐색
 *    허용 오류 수 = max(1, floor(len/4))  예) 4자 → 1개, 8자 → 2개
 */
function fuzzyContains(rawQuery: string, rawText: string): boolean {
  const q = norm(rawQuery)
  const t = norm(rawText)
  if (!q || !t) return false

  // ① 정확한 정규화 포함 (공백 차이만 있는 경우 여기서 처리)
  if (t.includes(q)) return true

  // 너무 짧으면 퍼지 불필요 (오탐 방지)
  if (q.length < 2) return false

  const maxErr = Math.max(1, Math.floor(q.length / 4))

  // query가 text보다 길면 전체 비교만
  if (q.length > t.length) return editDistance(q, t) <= maxErr

  // ② 슬라이딩 윈도우: 길이 q.length의 구간마다 편집 거리 확인
  for (let i = 0; i <= t.length - q.length; i++) {
    if (editDistance(q, t.slice(i, i + q.length)) <= maxErr) return true
  }
  return false
}

/** 이름(영/한) 또는 브랜드(영/한)로 향수를 검색합니다 */
export function searchPerfumes(query: string, excludes: string[] = []): Perfume[] {
  const q = query.toLowerCase().trim()
  const qNorm = norm(query)
  if (!q) return []

  return PERFUME_LIST
    .filter(p => !excludes.includes(p.name))
    .filter(p => {
      const brandKo = BRAND_KO[p.brand] ?? ''
      const nameKo  = p.nameKo ?? ''
      return (
        fuzzyContains(q, p.name)   ||
        fuzzyContains(q, p.brand)  ||
        fuzzyContains(q, nameKo)   ||
        fuzzyContains(q, brandKo)
      )
    })
    .sort((a, b) => {
      const brandKoA = BRAND_KO[a.brand] ?? ''
      const brandKoB = BRAND_KO[b.brand] ?? ''
      const nameKoA  = a.nameKo ?? ''
      const nameKoB  = b.nameKo ?? ''

      // 정규화(공백 제거) 기준 starts-with 우선
      const aNameStarts  = norm(a.name).startsWith(qNorm)   || norm(nameKoA).startsWith(qNorm)
      const bNameStarts  = norm(b.name).startsWith(qNorm)   || norm(nameKoB).startsWith(qNorm)
      if (aNameStarts && !bNameStarts) return -1
      if (!aNameStarts && bNameStarts) return 1

      const aBrandStarts = norm(a.brand).startsWith(qNorm)  || norm(brandKoA).startsWith(qNorm)
      const bBrandStarts = norm(b.brand).startsWith(qNorm)  || norm(brandKoB).startsWith(qNorm)
      if (aBrandStarts && !bBrandStarts) return -1
      if (!aBrandStarts && bBrandStarts) return 1

      return a.name.localeCompare(b.name)
    })
    .slice(0, 8)
}
