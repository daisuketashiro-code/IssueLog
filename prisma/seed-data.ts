export const categories = [
  {
    id: "cat-childcare",
    slug: "childcare",
    name: "子育て",
    description: "預けること、育てること、働くことが同じ日に重なる課題。",
    sortOrder: 1,
  },
  {
    id: "cat-care",
    slug: "care",
    name: "介護",
    description: "介護する人と、介護される人の両方の生活を支える課題。",
    sortOrder: 2,
  },
  {
    id: "cat-education",
    slug: "education",
    name: "教育",
    description: "つまずきに気づくタイミングと、社会に出る前の実務経験。",
    sortOrder: 3,
  },
  {
    id: "cat-digital",
    slug: "digital",
    name: "IT・デジタル",
    description: "現場の手順が、道具だけ先に入って止まってしまう課題。",
    sortOrder: 4,
  },
  {
    id: "cat-finance",
    slug: "finance",
    name: "金融",
    description: "入金のずれと、必要なときに資金へ届かない課題。",
    sortOrder: 5,
  },
  {
    id: "cat-government",
    slug: "government",
    name: "行政",
    description: "手続きが窓口ごとに分かれ、全体の進みが見えない課題。",
    sortOrder: 6,
  },
  {
    id: "cat-healthcare",
    slug: "healthcare",
    name: "医療",
    description: "受診の緊急度と、空いている枠がかみ合わない課題。",
    sortOrder: 7,
  },
  {
    id: "cat-environment",
    slug: "environment",
    name: "環境",
    description: "省エネや資源の工夫が、キャンペーンの月で終わってしまう課題。",
    sortOrder: 8,
  },
  {
    id: "cat-work",
    slug: "work",
    name: "働き方",
    description: "職種名では、現場が本当に困っている作業とつながらない課題。",
    sortOrder: 9,
  },
  {
    id: "cat-region",
    slug: "region",
    name: "地域",
    description: "空き家や空き店舗があっても、使う人まで届かない課題。",
    sortOrder: 10,
  },
];

export const models = [
  {
    id: "model-sub-match",
    slug: "sub-x-match",
    name: "サブスク × マッチング",
    components: ["サブスクリプション", "マッチング"],
    summary: "月額で関係を維持し、必要なときに相手を見つける。空きと需要が繰り返し出るテーマに向きやすい。",
    worksWhen: "月に何度も探す手間があり、供給側の空きが日々更新される場合。一時預かりや短い相談が典型です。",
    failsWhen: "一度きりの取引なのに月額を先に取る場合。空きの更新が週次のままだと、払った側の不満が先に立ちます。",
    sortOrder: 1,
  },
  {
    id: "model-saas-consult",
    slug: "saas-x-consult",
    name: "SaaS × コンサル",
    components: ["SaaS", "コンサルティング"],
    summary: "ソフトウェアで手順を固定し、導入の最初だけ人が伴走する。手順が暗黙知の業界で選ばれやすい。",
    worksWhen: "道具だけでは定着せず、最初の業務設計に知見が要る場合。終わりの日と、残す手順書が先に決まっていると続きます。",
    failsWhen: "伴走の終了条件がない場合。人が付き続けると、ソフトウェアの利益が人件費に消えます。",
    sortOrder: 2,
  },
  {
    id: "model-match-meter",
    slug: "match-x-meter",
    name: "マッチング × 従量課金",
    components: ["マッチング", "従量課金"],
    summary: "合う相手が見つかったときだけ費用が動く。試す回数を増やしたいテーマに向きやすい。",
    worksWhen: "会ってみないと相性が分からず、不成立のコストを小さくしたい場合。短い仕事や受診の振り分けが典型です。",
    failsWhen: "成立前の審査や安全確認に大きな固定費がかかる場合。成功報酬だけでは運営が持ちません。",
    sortOrder: 3,
  },
  {
    id: "model-freemium-data",
    slug: "free-x-data",
    name: "フリーミアム × データ",
    components: ["フリーミアム", "データ活用"],
    summary: "基本の記録は無料で始め、たまったデータから次の行動を有料で返す。続ける理由が記録そのものにあると強い。",
    worksWhen: "毎日の小さな記録が、後から本人の次の行動に変わる場合。学習の到達や使用量が典型です。",
    failsWhen: "無料の範囲で用が足り、データが点数の再表示で終わる場合。貯めるだけでは対価になりません。",
    sortOrder: 4,
  },
  {
    id: "model-platform-b2b2c",
    slug: "platform-x-b2b2c",
    name: "プラットフォーム × B2B2C",
    components: ["プラットフォーム", "B2B2C"],
    summary: "企業や行政が契約し、その先にいる家族や市民が使う。決める人と、毎日使う人が違うときに向く。",
    worksWhen: "個人がばらばらに契約するより、所属先が一括で入れた方が届く場合。手続きや福利厚生が典型です。",
    failsWhen: "契約した組織の指標と、現場の手間が別方向を向いている場合。現場が開かない仕組みになります。",
    sortOrder: 5,
  },
  {
    id: "model-share-flat",
    slug: "share-x-flat",
    name: "シェアリング × 定額",
    components: ["シェアリング", "定額制"],
    summary: "所有を分け、使う権利を月額で渡す。稼働の谷を埋められる資産に向く。",
    worksWhen: "空き時間や空き部屋が予測でき、事故と修繕の引き受け先が決まっている場合。",
    failsWhen: "責任範囲が曖昧なまま広げた場合。最初の修繕で、誰が払うかが割れて供給が止まります。",
    sortOrder: 6,
  },
  {
    id: "model-sub-data",
    slug: "sub-x-data",
    name: "サブスク × データ",
    components: ["サブスクリプション", "データ活用"],
    summary: "継続課金の対価として、計測と次の一手を返す。効果が見えるまでに時間がかかる行動に向く。",
    worksWhen: "一人では続かない行動を、記録と短いフィードバックで支えられる場合。省エネや家計が典型です。",
    failsWhen: "計測が面倒で、提案が一般論のままの場合。月額の理由が「見ているだけ」だと解約が早いです。",
    sortOrder: 7,
  },
  {
    id: "model-market-sub",
    slug: "market-x-sub",
    name: "マーケットプレイス × サブスク",
    components: ["マーケットプレイス", "サブスクリプション"],
    summary: "掲載を継続課金にし、状態が変わる供給を最新に保つ。情報の鮮度自体に価値があるときに機能する。",
    worksWhen: "物件や人の条件が変わり、更新され続けることに意味がある場合。空き家や稼働人材が典型です。",
    failsWhen: "掲載料だけが先に立ち、成約の見込みが薄い場合。供給側が更新をやめると場が古くなります。",
    sortOrder: 8,
  },
  {
    id: "model-data-usage",
    slug: "data-x-usage",
    name: "データ活用 × 従量課金",
    components: ["データ活用", "従量課金"],
    summary: "見えた異常や通知の回数に対して課金する。重い定額の前に、効果を小さく確かめられる。",
    worksWhen: "価値が気づきの回数に比例し、平常時の負担を小さくしたい場合。入金遅れの検知が典型です。",
    failsWhen: "検知しても次の行動が取れない場合。通知だけが増え、現場が無視し始めます。",
    sortOrder: 9,
  },
  {
    id: "model-market-meter",
    slug: "market-x-meter",
    name: "マーケットプレイス × 従量課金",
    components: ["マーケットプレイス", "従量課金"],
    summary: "相手を見つける場を開き、成立した分だけ対価を取る。使った分と価値を揃えたいときに向く。",
    worksWhen: "取引の成否が一件ずつ違い、定額にすると不公平になる場合。",
    failsWhen: "成立前の確認に固定費がかかり、件数が増える前に運営が疲れる場合。",
    sortOrder: 10,
  },
];

type SeedIssue = {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  description: string;
  keywords: string;
  sortOrder: number;
  modelIds: string[];
  solutions: { title: string; description: string }[];
};

export const issues: SeedIssue[] = [
  {
    id: "issue-sudden-childcare",
    slug: "sudden-childcare",
    categoryId: "cat-childcare",
    title: "急な預かり先が見つからない",
    description:
      "残業、発熱、行事で、いつもの預け先が使えない日がある。空きはあるのに保護者からは見えず、園からも当日の穴が埋まりにくい。",
    keywords: "預け 預かり 保育園 保育 待機 子ども 子供 仕事 復帰 病児 一時保育 残業",
    sortOrder: 1,
    modelIds: ["model-sub-match", "model-share-flat"],
    solutions: [
      {
        title: "当日の空き人数だけを地域で共有する",
        description: "園ごとの電話をやめ、その日の空き人数と条件だけを共通の表に出す。埋まった枠はその日で閉じる。",
      },
      {
        title: "病児と通常預かりを最初に分ける",
        description: "条件が違う家庭へ同じ空きを流さない。合う人にだけ知らせると、確認の往復が減る。",
      },
      {
        title: "企業同士で保育枠を融通する",
        description: "自社で埋めない枠を、近隣の会社が使った分だけ精算する。所有と利用を分ける。",
      },
    ],
  },
  {
    id: "issue-care-isolation",
    slug: "care-isolation",
    categoryId: "cat-care",
    title: "家族介護が一人に集中する",
    description:
      "世話の手順も、頼れる人も、家族の中の一人に集まりやすい。相談はできても、翌日からの手が足りない。",
    keywords: "介護 家族 親 認知症 ケアマネ レスパイト 孤立 遠距離 限界",
    sortOrder: 1,
    modelIds: ["model-saas-consult", "model-share-flat"],
    solutions: [
      {
        title: "家族と専門職が同じ記録を見る",
        description: "家族側は「今日できたこと」だけを書き、専門職の長文は残す。翌朝の一手をそこで決める。",
      },
      {
        title: "レスパイトを時間単位で予約できる定額にする",
        description: "月に含まれる時間を先に見せ、超過分だけ別料金にする。外出の予定が先に立つ。",
      },
      {
        title: "資格が要る仕事と見守りを分ける",
        description: "近所に頼める範囲と、専門職が担う範囲をメニューで分ける。頼みやすい側から埋まる。",
      },
    ],
  },
  {
    id: "issue-care-staff",
    slug: "care-staff",
    categoryId: "cat-care",
    title: "介護の現場が人手が足りず回らない",
    description: "有資格者の時間が、記録や送迎など周辺業務に吸われている。採用しても定着しないと、ケアの質が落ちる。",
    keywords: "介護 人材 人手不足 職員 離職 夜勤 施設 シフト",
    sortOrder: 2,
    modelIds: ["model-saas-consult", "model-platform-b2b2c"],
    solutions: [
      {
        title: "記録を短くし、有資格者の時間をケアに戻す",
        description: "入力項目を現場の一日に合わせ、本部が見たい指標と現場の手間を同じ方向にそろえる。",
      },
      {
        title: "周辺業務だけを別の働き方で受ける",
        description: "送迎や記録の補助を、資格が要るケアから切り出す。",
      },
      {
        title: "定着までの90日を型にする",
        description: "教育とシフトの最初の90日を手順にし、担当者の記憶に残さない。",
      },
    ],
  },
  {
    id: "issue-learning-gap",
    slug: "learning-gap",
    categoryId: "cat-education",
    title: "どこでつまずいているか共有できない",
    description: "点数が下がってから遅れに気づく。単元のどこで止まったかは、教室と家庭で別々の感覚のままになりやすい。",
    keywords: "勉強 学習 つまずき 塾 学校 宿題 不登校 教育 成績",
    sortOrder: 1,
    modelIds: ["model-freemium-data", "model-saas-consult"],
    solutions: [
      {
        title: "単元ごとの到達だけを短い言葉で共有する",
        description: "点数の再表示ではなく、戻るべき単元の名前を家庭と学校で同じにする。",
      },
      {
        title: "つまずいた単元へ戻る演習をその場で出す",
        description: "先の範囲を足す前に、止まった単元だけを出す。",
      },
      {
        title: "学校外の学びも同じ到達表に載せる",
        description: "塾や家庭学習を別の表にしない。見る場所を一つにする。",
      },
    ],
  },
  {
    id: "issue-school-to-work",
    slug: "school-to-work",
    categoryId: "cat-education",
    title: "社会に出る前に実務の感触がない",
    description: "授業の成果と、職場で最初の週に頼まれることが離れやすい。企業側も、長いインターンを出す余白がない。",
    keywords: "学生 就職 インターン 実務 キャリア 若者 仕事体験",
    sortOrder: 2,
    modelIds: ["model-platform-b2b2c", "model-match-meter"],
    solutions: [
      {
        title: "2週間で終わる実務課題を地域の事業者と組む",
        description: "長いインターンではなく、終わりが見える作業を一つ渡す。",
      },
      {
        title: "評価は点数ではなく、できた作業の記録で返す",
        description: "何が完了したかを文章で残し、次の応募に使える形にする。",
      },
      {
        title: "受けられる人だけにメンターを頼む",
        description: "社員全員の役割にせず、時間を出せる人の稼働だけを募集する。",
      },
    ],
  },
  {
    id: "issue-sme-digital",
    slug: "sme-digital",
    categoryId: "cat-digital",
    title: "中小の現場がデジタル化の途中で止まる",
    description: "ツールは入っても、現場の手順が変わらないと使われない。担当者が辞めると、設定の意味も分からなくなる。",
    keywords: "中小企業 DX デジタル 紙 エクセル Excel 業務 導入 IT システム 請求",
    sortOrder: 1,
    modelIds: ["model-saas-consult"],
    solutions: [
      {
        title: "一番詰まる業務ひとつから始める",
        description: "受発注の全部を一度に置き換えず、請求や日報など一つの手順に限る。",
      },
      {
        title: "導入後30日は手順を直す伴走を付ける",
        description: "期間と終わりの日を先に決める。残すのは訪問ではなく、4ステップの手順書。",
      },
      {
        title: "設定を担当者の記憶から手順書へ移す",
        description: "人が代わっても同じ手順で出せることを、継続の条件にする。",
      },
    ],
  },
  {
    id: "issue-cashflow",
    slug: "cashflow",
    categoryId: "cat-finance",
    title: "入金の遅れが見える前に資金が詰まる",
    description: "売上はあるのに、入金月がずれて支払いに間に合わない。気づけたときには、次の手を打つ余白が少ない。",
    keywords: "資金繰り 入金 請求 キャッシュ 融資 支払 売掛 資金",
    sortOrder: 1,
    modelIds: ["model-data-usage", "model-market-meter"],
    solutions: [
      {
        title: "請求と入金予定を同じ画面で週次に見る",
        description: "月末の残高だけでなく、来週払うものと来週入るものを並べる。",
      },
      {
        title: "遅れが始まった取引先だけを切り分ける",
        description: "全件の一覧ではなく、予定日を超えた相手だけを通知する。",
      },
      {
        title: "必要な数週間だけを埋める手段につなぐ",
        description: "気づいた週に、金融機関へ共有する手順までセットにする。",
      },
    ],
  },
  {
    id: "issue-fragmented-procedures",
    slug: "fragmented-procedures",
    categoryId: "cat-government",
    title: "手続きが窓口ごとに分断されている",
    description: "同じ添付を、部署の数だけ出し直す。市民からは全体の進み具合が見えず、窓口も確認に時間を使う。",
    keywords: "行政 手続き 申請 窓口 役所 補助金 書類 市民",
    sortOrder: 1,
    modelIds: ["model-platform-b2b2c"],
    solutions: [
      {
        title: "一度出した情報を次の手続きで引き出す",
        description: "世帯の基本情報は再入力しない。変わった項目だけを聞く。",
      },
      {
        title: "申請前に不足を返す",
        description: "窓口に着いてからの差し戻しを減らし、窓口では確認に集中する。",
      },
      {
        title: "混雑を来る前に見えるようにする",
        description: "待ち時間の目安を、出発前に返す。",
      },
    ],
  },
  {
    id: "issue-clinic-mismatch",
    slug: "clinic-mismatch",
    categoryId: "cat-healthcare",
    title: "軽症の受診と空き枠がかみ合わない",
    description: "朝に電話が集中し、早く診るべき人と後日でよい人が同じ列に並ぶ。空き枠はあっても、当日には見つからない。",
    keywords: "病院 受診 予約 待ち時間 クリニック オンライン診療 医療 発熱",
    sortOrder: 1,
    modelIds: ["model-match-meter", "model-sub-match"],
    solutions: [
      {
        title: "最初の質問で緊急度を分ける",
        description: "受付の質問を3つに固定し、当日診る人と翌日以降で足りる人を分ける。",
      },
      {
        title: "当日の空きを閉じる前に一度だけ公開する",
        description: "午前の終わりに空きを出し、埋まった時点で閉じる。",
      },
      {
        title: "オンラインで足りる相談を最初に分ける",
        description: "対面が要る相談と、遠隔で足りる相談を同じ列にしない。",
      },
    ],
  },
  {
    id: "issue-energy-habit",
    slug: "energy-habit",
    categoryId: "cat-environment",
    title: "省エネがキャンペーンの月だけで終わる",
    description: "請求が来る頃には、どの行動が効いたか分からない。一人で続けるより、同じ建物で比べられた方が続きやすい。",
    keywords: "省エネ 電気代 環境 節電 光熱費 脱炭素",
    sortOrder: 1,
    modelIds: ["model-sub-data", "model-freemium-data"],
    solutions: [
      {
        title: "使用量の変化を翌週に一行で返す",
        description: "月次の請求を待たず、増減の理由を短い言葉にする。",
      },
      {
        title: "提案は毎回ひとつにする",
        description: "できなかった目標は翌月に残さない。続いた行動だけを残す。",
      },
      {
        title: "同じ建物で設備更新を一緒に行う",
        description: "個人の努力で届かない部分は、共同の発注に分ける。",
      },
    ],
  },
  {
    id: "issue-skill-mismatch",
    slug: "skill-mismatch",
    categoryId: "cat-work",
    title: "経験と求人が職種名でしかつながらない",
    description: "職務経歴の職種名と、現場が本当に困っている作業が一致しない。合ってから気づくと、双方にコストが残る。",
    keywords: "転職 仕事 スキル 副業 採用 ミスマッチ キャリア 働き方 求人",
    sortOrder: 1,
    modelIds: ["model-match-meter", "model-sub-match"],
    solutions: [
      {
        title: "求人を作業の単位に分ける",
        description: "職種名を減らし、来月困っている作業を件数で公開する。",
      },
      {
        title: "短い試用で確かめてから本採用を決める",
        description: "合わなかった場合の記録だけを残し、本採用の義務は置かない。",
      },
      {
        title: "社内の別部署の困り事を先に公募する",
        description: "外へ出す前に、社内で作業単位の公募を一周させる。",
      },
    ],
  },
  {
    id: "issue-vacant-house",
    slug: "vacant-house",
    categoryId: "cat-region",
    title: "空き家があるのに使う人が見つからない",
    description: "所有者は維持で手いっぱいで、使いたい人は条件と手続きが見えない。短い滞在なら関われる人が地域の外にいる。",
    keywords: "空き家 地方 移住 地域 関係人口 空き店舗 担い手",
    sortOrder: 1,
    modelIds: ["model-market-sub", "model-share-flat"],
    solutions: [
      {
        title: "貸せる条件を所有者の言葉のまま公開する",
        description: "改修前でも可能か、週末だけかを必須項目にする。",
      },
      {
        title: "改修が要る用途と、今すぐ使える用途を分ける",
        description: "使いたい人の希望と、今の建物の状態を先に重ねる。",
      },
      {
        title: "管理だけを定額で引き受け、使う人は別に見つける",
        description: "所有者が更新できない理由が管理なら、マッチングと管理を分けて契約する。",
      },
    ],
  },
];

export const cases = [
  {
    id: "case-procedure",
    title: "一度出した添付を次の申請に引き継ぎ、差し戻しが減った窓口",
    summary:
      "市民は自治体経由のアカウントを持ち、世帯の基本情報を出し直さない。不足がある申請だけを事前に返し、窓口では確認に集中する。契約するのは自治体で、使うのは市民、という役割が分かれていた、という整理事例。",
    outcome: "success",
    issueId: "issue-fragmented-procedures",
    businessModelId: "model-platform-b2b2c",
    publishedAt: "2026-09-28",
    tags: ["行政", "プラットフォーム", "B2B2C"],
  },
  {
    id: "case-job-trial",
    title: "職種名ではなく2週間の作業で採用を決めた事業",
    summary:
      "求人票の職種を減らし、来月困っている作業を3件公開した。応募者はそのうち1件を短い試用で行い、成立した作業の分だけ費用が動く。合わなかった場合は記録だけが残り、本採用の義務は置かない、という整理事例。",
    outcome: "success",
    issueId: "issue-skill-mismatch",
    businessModelId: "model-match-meter",
    publishedAt: "2026-09-20",
    tags: ["働き方", "マッチング", "従量課金"],
  },
  {
    id: "case-clinic",
    title: "朝の電話を緊急度で分け、当日枠を昼前に公開した診療所",
    summary:
      "受付の最初の質問を3つに固定し、当日診る人と翌日以降で足りる人を分けた。空いた枠は午前の終わりに一度だけ公開し、埋まった時点で閉じる。費用は予約が成立した件数に寄せ、来院しなかった分は請求しない、という整理事例。",
    outcome: "success",
    issueId: "issue-clinic-mismatch",
    businessModelId: "model-match-meter",
    publishedAt: "2026-09-14",
    tags: ["医療", "マッチング", "従量課金"],
  },
  {
    id: "case-energy",
    title: "電気の使い方を翌週に一言で返し、続けた集合住宅",
    summary:
      "月次の請求ではなく、週の使用量が増減した理由を一行で返した。提案は毎回ひとつだけにし、できなかった目標は翌月に残さない。月額は計測と一行コメントの対価として説明し、設備の売り込みは別枠にした、という整理事例。",
    outcome: "success",
    issueId: "issue-energy-habit",
    businessModelId: "model-sub-data",
    publishedAt: "2026-09-02",
    tags: ["環境", "サブスクリプション", "データ活用"],
  },
  {
    id: "case-cash",
    title: "入金遅れの兆候だけを通知し、相談を前倒しできた",
    summary:
      "全取引先の一覧ではなく、支払予定日を2回超えた相手だけを週次で通知した。通知の件数に応じて費用が変わるため、平常時の負担は小さい。気づいた週に金融機関へ共有する手順までセットにした、という整理事例。",
    outcome: "success",
    issueId: "issue-cashflow",
    businessModelId: "model-data-usage",
    publishedAt: "2026-08-20",
    tags: ["金融", "データ活用", "従量課金"],
  },
  {
    id: "case-childcare",
    title: "当日の空きを地域3園で共有し、キャンセル枠が埋まった",
    summary:
      "園ごとの電話受付をやめ、その日の空き人数だけを共通の表に出した。保護者は月額で参加し、使った日だけ園に追加で払う。埋められなかった枠は翌日に持ち越さず、その日で閉じる運用にした、という整理事例。",
    outcome: "success",
    issueId: "issue-sudden-childcare",
    businessModelId: "model-sub-match",
    publishedAt: "2026-08-12",
    tags: ["子育て", "サブスクリプション", "マッチング"],
  },
  {
    id: "case-sme",
    title: "請求書だけを先に置き換えた会社が、全体導入より先に効果を出した",
    summary:
      "受発注すべてを一度にやめる計画を止め、請求と入金消込だけをSaaSにした。伴走は30日で終え、手順は4ステップの紙1枚に残した。担当者が代わっても同じ手順で出せることが、継続の条件になった、という整理事例。",
    outcome: "success",
    issueId: "issue-sme-digital",
    businessModelId: "model-saas-consult",
    publishedAt: "2026-07-30",
    tags: ["IT・デジタル", "SaaS", "コンサルティング"],
  },
  {
    id: "case-care-board",
    title: "家族とケアマネが同じ記録を見て、翌朝の手が決まるようになった",
    summary:
      "介護記録に、家族が見る欄だけを足した。導入の最初の1か月は相談員が訪問し、何を書くかを3項目に削った。専門職の長文は残し、家族側は今日できたことだけにする役割分担が定着した、という整理事例。",
    outcome: "success",
    issueId: "issue-care-isolation",
    businessModelId: "model-saas-consult",
    publishedAt: "2026-07-18",
    tags: ["介護", "SaaS", "コンサルティング"],
  },
  {
    id: "case-house",
    title: "貸せる条件を先に公開し、内見前の問い合わせが具体的になった空き家",
    summary:
      "所有者は月額で掲載を更新し、改修前でも可能かどうかを必須項目にした。使う側は週末だけ、作業場のように用途を選ぶ。管理の定額と、使う人を見つけることを分けた、という整理事例。",
    outcome: "success",
    issueId: "issue-vacant-house",
    businessModelId: "model-market-sub",
    publishedAt: "2026-07-02",
    tags: ["地域", "マーケットプレイス", "サブスクリプション"],
  },
  {
    id: "case-respite",
    title: "レスパイトを4時間単位の定額にし、家族の外出が先に予約できた",
    summary:
      "施設の空きを家族同士で融通し、月額には4時間までを含めた。超過分は別料金。資格が要るケアと見守りをメニューで分けたことで、頼みやすい範囲が先に埋まった、という整理事例。",
    outcome: "success",
    issueId: "issue-care-isolation",
    businessModelId: "model-share-flat",
    publishedAt: "2026-06-20",
    tags: ["介護", "シェアリング", "定額制"],
  },
  {
    id: "case-childcare-fail",
    title: "月額を先に集めたが、空き枠の更新が週1回で解約が続いた",
    summary:
      "マッチングの月額だけを先に設計し、園側の空き更新が担当者の余力任せだった。保護者からは、払っているのに空きが見えない状態になり、3か月で更新率が落ちた。供給の更新が日次でないまま需要側だけ課金すると、この組み合わせは崩れやすい、という整理事例。",
    outcome: "failure",
    issueId: "issue-sudden-childcare",
    businessModelId: "model-sub-match",
    publishedAt: "2026-10-02",
    tags: ["子育て", "サブスクリプション", "マッチング"],
  },
  {
    id: "case-saas-fail",
    title: "伴走が終わらず、ソフトの利益が人件費に消えた導入",
    summary:
      "業務整理を期限なしのコンサルにし、SaaS利用料より訪問日数の請求が大きくなった。顧客は手順を自分たちで変える経験を積めず、担当変更のたびに再訪が必要になった。伴走に終わりの条件がないと、SaaS×コンサルはコンサル事業のまま残る、という整理事例。",
    outcome: "failure",
    issueId: "issue-sme-digital",
    businessModelId: "model-saas-consult",
    publishedAt: "2026-06-02",
    tags: ["IT・デジタル", "SaaS", "コンサルティング"],
  },
  {
    id: "case-share-fail",
    title: "責任範囲を決めないまま空き家を定額で貸し、最初の修繕で止まった",
    summary:
      "鍵の受け渡しと光熱費だけを定額に含め、雨漏りと近隣対応の担当が契約に無かった。最初の修繕の請求先が割れ、供給側が掲載を止めた。シェアリング×定額は、事故と修繕の引き受け先が決まってから広げないと続かない、という整理事例。",
    outcome: "failure",
    issueId: "issue-vacant-house",
    businessModelId: "model-share-flat",
    publishedAt: "2026-05-18",
    tags: ["地域", "シェアリング", "定額制"],
  },
  {
    id: "case-free-fail",
    title: "記録は無料で集まったが、家庭に返す中身がなく有料化できなかった",
    summary:
      "学習の記録は単元の正誤を大量に貯めた一方、家庭向けの画面は点数の再表示だった。有料の分析が次に戻る単元を示せず、続ける理由は無料のドリルで足りた。データが本人の次の行動に変わらないと、フリーミアム×データは記録止まりになる、という整理事例。",
    outcome: "failure",
    issueId: "issue-learning-gap",
    businessModelId: "model-freemium-data",
    publishedAt: "2026-05-04",
    tags: ["教育", "フリーミアム", "データ活用"],
  },
  {
    id: "case-b2b2c-fail",
    title: "本部が契約したシフトシステムを、現場が開かなかった",
    summary:
      "法人本部の管理目的で導入し、現場には入力項目だけが増えた。使う人の残業削減が見えず、記録は紙に戻った。B2B2Cは、契約者の指標と現場の手間が同じ方向を向いていないと、仕組みだけが残る、という整理事例。",
    outcome: "failure",
    issueId: "issue-care-staff",
    businessModelId: "model-platform-b2b2c",
    publishedAt: "2026-04-16",
    tags: ["介護", "プラットフォーム", "B2B2C"],
  },
];
