// グローバル変数
let profileData = {};
let productData = {};
let generatedCatchphrase = '';
let generatedLP = '';

// 商品カテゴリー別の適正価格データ
const categoryPrices = {
    '教育・学習': { min: 3000, max: 50000, average: 15000 },
    '健康・美容': { min: 2000, max: 30000, average: 8000 },
    'ビジネス・投資': { min: 10000, max: 100000, average: 35000 },
    '趣味・エンターテイメント': { min: 1000, max: 20000, average: 5000 },
    '生活・家庭': { min: 1500, max: 25000, average: 7000 },
    '技術・IT': { min: 5000, max: 80000, average: 25000 },
    'その他': { min: 2000, max: 30000, average: 10000 }
};

// 年齢・性別別キャッチコピー生成テンプレート
const catchphraseTemplates = {
    男性: {
        男性: {
            '20代': [
                '🚀 20代で{achievements}達成！{personality}な{skills}専門家が同世代の成功を加速させる',
                '💪 若い力で{skills}を極める！{personality}で{achievements}を実現した20代のリアル戦略',
                '⚡ 20代の今だから始められる{skills}革命！{personality}×{achievements}の実証済み成功法'
            ],
            '30代': [
                '🎯 30代の転機を{skills}で勝機に！{personality}で{achievements}を実現したキャリア戦略',
                '💼 働き盛り30代の{skills}最適化術！{personality}×{achievements}で人生の質を向上',
                '🔥 30代からの本気の{skills}！{personality}で{achievements}達成の確実ステップ'
            ],
            '40代': [
                '👑 40代の経験を{skills}で最大化！{personality}×{achievements}の円熟した成功メソッド',
                '🎖️ 管理職世代の{skills}戦略！{personality}で{achievements}を実現した実践的アプローチ',
                '💡 40代の知恵と{skills}の融合！{personality}×{achievements}で新たなステージへ'
            ],
            '50代': [
                '🏆 50代の集大成を{skills}で！{personality}×{achievements}の熟練者が教える最終形',
                '🌟 人生後半戦の{skills}活用術！{personality}で{achievements}を実現した50代の知恵',
                '⭐ ベテランの{skills}極意！{personality}×{achievements}で次世代に伝える価値創造'
            ],
            '60代以上': [
                '🌅 人生の新章を{skills}で！{personality}×{achievements}のシニア世代向け特別プログラム',
                '🎨 経験豊富な{skills}の真髄！{personality}で{achievements}を実現した人生の集大成',
                '📚 60代からの{skills}新発見！{personality}×{achievements}で豊かなセカンドライフ'
            ]
        },
        女性: {
            '20代': [
                '💎 20代女性の{skills}で人生を輝かせる！{personality}×{achievements}の成功ストーリー',
                '🌸 若い女性の{skills}開花術！{personality}で{achievements}を実現した同世代サポート',
                '✨ 20代女性のキラキラ{skills}ライフ！{personality}×{achievements}で夢を現実に'
            ],
            '30代': [
                '👩‍💼 働く30代女性の{skills}バランス術！{personality}で{achievements}とライフスタイルを両立',
                '🌺 30代女性の美しい{skills}ライフ！{personality}×{achievements}で輝く毎日を手に入れる',
                '💫 大人女性の{skills}エレガンス！{personality}で{achievements}を実現した30代の秘訣'
            ],
            '40代': [
                '👸 40代女性の{skills}で新たな魅力！{personality}×{achievements}の成熟した美しさ',
                '🌹 円熟期女性の{skills}活用術！{personality}で{achievements}を実現した人生の黄金期',
                '💖 40代女性の{skills}リノベーション！{personality}×{achievements}で第二の青春を'
            ],
            '50代': [
                '🌻 50代女性の{skills}で人生最高潮！{personality}×{achievements}の豊かな成熟ライフ',
                '👑 女性としての集大成{skills}！{personality}で{achievements}を実現した50代の輝き',
                '🎭 大人の女性の{skills}アート！{personality}×{achievements}で描く理想の未来'
            ],
            '60代以上': [
                '🌈 人生を彩る{skills}の極意！{personality}×{achievements}のシニア女性向け特別メソッド',
                '🦋 60代女性の{skills}で美しい変身！{personality}で{achievements}を実現した人生の花開き',
                '🌙 穏やかな{skills}ライフ！{personality}×{achievements}で豊かなシニアライフを'
            ]
        },
        すべて: {
            '20代': [
                '🚀 20代の可能性を{skills}で爆発させる！{personality}×{achievements}の若者向け成功戦略',
                '⚡ 若い世代の{skills}革命！{personality}で{achievements}を実現した20代専用メソッド',
                '💥 20代の今こそ{skills}で差をつける！{personality}×{achievements}の実証済み成功法'
            ],
            '30代': [
                '🎯 30代の転換期を{skills}でチャンスに！{personality}×{achievements}の人生戦略',
                '🔥 働き盛り世代の{skills}最適化！{personality}で{achievements}を実現した30代の秘訣',
                '💼 30代の今だからできる{skills}投資！{personality}×{achievements}で未来を変える'
            ],
            '40代': [
                '👑 40代の経験値を{skills}で活かす！{personality}×{achievements}の円熟した成功術',
                '🎖️ ミドル世代の{skills}戦略！{personality}で{achievements}を実現した実践的アプローチ',
                '💡 40代の知恵と{skills}の最強コンビ！{personality}×{achievements}で新ステージへ'
            ],
            '50代': [
                '🏆 50代の集大成を{skills}で！{personality}×{achievements}のベテラン向け特別プログラム',
                '🌟 人生後半の{skills}活用術！{personality}で{achievements}を実現した50代の知恵',
                '⭐ ベテランの{skills}マスタリー！{personality}×{achievements}で価値ある人生を'
            ],
            '60代以上': [
                '🌅 新たな人生章を{skills}で！{personality}×{achievements}のシニア向け特別コース',
                '🎨 豊富な経験と{skills}の融合！{personality}で{achievements}を実現した人生の極意',
                '📚 60代からの{skills}新発見！{personality}×{achievements}で豊かなライフスタイル'
            ]
        }
    },
    女性: {
        男性: {
            '20代': [
                '💪 20代男性の心を掴む{skills}術！{personality}×{achievements}の女性専門家が教える成功法',
                '🎯 若い男性向け{skills}戦略！{personality}で{achievements}を実現した女性講師の特別メソッド',
                '⚡ 20代男性の{skills}加速術！{personality}×{achievements}の実証済み女性目線アプローチ'
            ],
            '30代': [
                '🔥 30代男性の{skills}バランス術！{personality}で{achievements}を実現した女性専門家のサポート',
                '💼 働く30代男性の{skills}最適化！{personality}×{achievements}の女性コンサルタントが指導',
                '🎖️ 30代男性のキャリア{skills}！{personality}で{achievements}達成の女性メンターがガイド'
            ],
            '40代': [
                '👑 40代男性の{skills}リーダーシップ！{personality}×{achievements}の女性専門家が徹底サポート',
                '🏆 管理職男性の{skills}戦略！{personality}で{achievements}を実現した女性アドバイザーの指導',
                '💡 40代男性の{skills}マネジメント！{personality}×{achievements}の女性エキスパートが伝授'
            ],
            '50代': [
                '🌟 50代男性の{skills}集大成！{personality}で{achievements}を実現した女性専門家の最終講義',
                '⭐ ベテラン男性の{skills}極意！{personality}×{achievements}の女性マスターが教える奥義',
                '🎭 50代男性の{skills}アート！{personality}で{achievements}達成の女性講師による特別指導'
            ],
            '60代以上': [
                '🌅 シニア男性の{skills}新発見！{personality}×{achievements}の女性専門家によるシニア向けプログラム',
                '📚 60代男性の{skills}ライフワーク！{personality}で{achievements}を実現した女性指導者の集大成',
                '🎨 シニア男性の{skills}楽しみ方！{personality}×{achievements}の女性エキスパートが提案'
            ]
        },
        女性: {
            '20代': [
                '💎 20代女性同士の{skills}シスターフッド！{personality}×{achievements}の同世代女性が完全サポート',
                '🌸 若い女性の{skills}で人生を彩る！{personality}で{achievements}を実現した20代女性のリアル体験',
                '✨ 20代女性の{skills}キラキラライフ！{personality}×{achievements}の同年代成功ストーリー'
            ],
            '30代': [
                '👩‍💼 30代女性の{skills}ワークライフバランス！{personality}で{achievements}と幸せを両立した実体験',
                '🌺 働く女性の{skills}エレガンス！{personality}×{achievements}の30代女性による美しい成功術',
                '💫 大人女性の{skills}スタイル！{personality}で{achievements}を実現した30代の洗練されたアプローチ'
            ],
            '40代': [
                '👸 40代女性の{skills}で新しい魅力を！{personality}×{achievements}の同世代女性による人生リノベーション',
                '🌹 円熟期女性の{skills}ビューティフルライフ！{personality}で{achievements}を実現した40代の輝き方',
                '💖 40代女性の{skills}セカンドライフ！{personality}×{achievements}で描く理想の未来図'
            ],
            '50代': [
                '🌻 50代女性の{skills}人生最高潮！{personality}で{achievements}を実現した同世代女性の豊かな生き方',
                '👑 女性としての集大成{skills}！{personality}×{achievements}の50代女性による人生の花開き',
                '🎭 成熟女性の{skills}アートライフ！{personality}で{achievements}達成の50代女性が教える極意'
            ],
            '60代以上': [
                '🌈 シニア女性の{skills}で人生を彩る！{personality}×{achievements}の同世代女性による特別プログラム',
                '🦋 60代女性の{skills}美しい変身！{personality}で{achievements}を実現した人生の新章',
                '🌙 穏やかな{skills}シニアライフ！{personality}×{achievements}で豊かな黄金期を'
            ]
        },
        すべて: {
            '20代': [
                '🚀 20代の可能性を{skills}で開花！{personality}×{achievements}の女性専門家による若者向け成功法',
                '⚡ 若い世代の{skills}パワーアップ！{personality}で{achievements}を実現した女性メンターのガイダンス',
                '💥 20代の今こそ{skills}で差をつける！{personality}×{achievements}の女性講師による実証済みメソッド'
            ],
            '30代': [
                '🎯 30代の転換期を{skills}でチャンスに！{personality}で{achievements}を実現した女性専門家のライフ戦略',
                '🔥 働き盛り世代の{skills}バランス術！{personality}×{achievements}の女性コンサルタントが完全サポート',
                '💼 30代の{skills}投資で未来を変える！{personality}で{achievements}達成の女性アドバイザーが指導'
            ],
            '40代': [
                '👑 40代の経験を{skills}で活かす！{personality}×{achievements}の女性専門家による円熟した成功術',
                '🎖️ ミドル世代の{skills}戦略！{personality}で{achievements}を実現した女性エキスパートの実践アプローチ',
                '💡 40代の知恵と{skills}の最強融合！{personality}×{achievements}の女性マスターが新ステージへ導く'
            ],
            '50代': [
                '🏆 50代の集大成を{skills}で！{personality}で{achievements}を実現した女性専門家によるベテラン向け特別コース',
                '🌟 人生後半の{skills}活用術！{personality}×{achievements}の女性ベテランが教える価値ある生き方',
                '⭐ ベテランの{skills}マスタリー！{personality}で{achievements}達成の女性指導者による人生の極意'
            ],
            '60代以上': [
                '🌅 新たな人生章を{skills}で！{personality}×{achievements}の女性専門家によるシニア向け特別プログラム',
                '🎨 豊富な経験と{skills}の美しい融合！{personality}で{achievements}を実現した女性シニアの集大成',
                '📚 60代からの{skills}新発見！{personality}×{achievements}の女性エキスパートが提案する豊かなライフスタイル'
            ]
        }
    }
};

// 年齢・性別・カテゴリー別ベネフィットテンプレート
const benefitTemplates = {
    '教育・学習': {
        '20代': {
            '男性': [
                '💼 年収300万→500万への確実なステップアップ',
                '🚀 転職市場で圧倒的差をつける専門スキル習得',
                '⚡ 20代で身につけた知識が生涯年収を2000万円UP',
                '🎯 同期と差がつく実践的スキルで昇進を加速'
            ],
            '女性': [
                '✨ 女性らしさを活かしたキャリア形成術',
                '👩‍💼 ワークライフバランスを保ちながらスキルアップ',
                '💎 専門知識で女性として輝くキャリアを構築',
                '🌸 20代で築く安定した将来への投資'
            ],
            'すべて': [
                '🚀 20代の今だから身につく圧倒的成長スピード',
                '💡 将来への不安を確信に変える実践的学習',
                '⭐ 同世代をリードする差別化されたスキル',
                '🎯 キャリアの基盤となる確実な知識投資'
            ]
        },
        '30代': {
            '男性': [
                '👑 管理職への最短ルート！リーダーシップスキル',
                '💼 家族を養うための確実な収入アップ戦略',
                '🏆 30代で築く専門性で生涯安泰のキャリア',
                '⚡ 部下から尊敬される実力派上司になる'
            ],
            '女性': [
                '🌺 子育てと両立できる在宅ワークスキル',
                '👸 30代女性の美しいキャリア再構築',
                '💫 復職・転職に有利な実践的専門知識',
                '🌻 家庭と仕事を両立する時間管理術'
            ],
            'すべて': [
                '🎯 30代の転換期を成功に変える実践戦略',
                '💪 責任世代が身につけるべき確実なスキル',
                '🔥 キャリア中盤で差をつける専門性強化',
                '🌟 将来への投資として最適な学習プログラム'
            ]
        },
        '40代': {
            '男性': [
                '👨‍💼 役員・経営陣への道筋を描く戦略的学習',
                '🏛️ 40代で築く揺るがない専門家ポジション',
                '💎 豊富な経験と新知識の最強コンビネーション',
                '🎖️ 次世代に教えられる深い専門性を習得'
            ],
            '女性': [
                '👑 40代女性の知性と経験を活かした新領域開拓',
                '🌹 人生後半の新しいチャレンジで輝きを取り戻す',
                '💖 子育て経験を活かした専門分野での活躍',
                '🌸 40代からの第二のキャリアで人生を豊かに'
            ],
            'すべて': [
                '🎭 豊富な経験に新知識をプラスした最強の組み合わせ',
                '💡 40代の知恵と学習の融合で生まれる新価値',
                '🏆 人生の集大成に向けた戦略的スキル投資',
                '⭐ 次世代をリードする深い専門性の確立'
            ]
        }
    },
    '健康・美容': {
        '20代': {
            '男性': [
                '💪 モテる男の体づくり！女性が振り返る肉体美',
                '🔥 20代で築く一生ものの健康体質',
                '⚡ 仕事のパフォーマンスを劇的に向上させる体力',
                '🎯 同世代男性をリードする圧倒的な外見力'
            ],
            '女性': [
                '✨ インスタ映えする美ボディで注目度UP',
                '👸 20代女性の輝く美しさで人生が変わる',
                '💎 美容投資で将来の自分への最高のプレゼント',
                '🌸 恋愛・結婚で選ばれる女性になる美容術'
            ],
            'すべて': [
                '🚀 20代の今だから効果的！基礎代謝アップ法',
                '💫 若さを最大化する健康・美容ライフスタイル',
                '⭐ 一生続く美しさの土台を20代で構築',
                '🌟 健康体質で人生100年時代を勝ち抜く'
            ]
        },
        '30代': {
            '男性': [
                '👔 デキる男の体型管理で仕事も私生活も充実',
                '💼 30代男性の魅力を最大化する健康投資',
                '🏆 妻子から尊敬される健康的なパパになる',
                '⚡ ストレス社会を乗り切る体力・精神力強化'
            ],
            '女性': [
                '🌺 30代女性の美しい生き方で周りから憧れられる',
                '👩‍💼 働く女性の美容時短術で効率的に美しく',
                '💫 ママでも美しい！子育て中の美容・健康管理',
                '🌻 30代の今だから始める予防美容で差をつける'
            ],
            'すべて': [
                '🎯 30代の体の変化に対応した効果的健康法',
                '💪 忙しい30代でも続けられる時短美容・健康術',
                '🔥 代謝の落ちる30代でも理想体型をキープ',
                '🌟 健康投資で40代以降の人生を豊かに'
            ]
        },
        '40代': {
            '男性': [
                '🍷 40代男性の渋い魅力で若い世代からも尊敬される',
                '🎖️ 管理職の重圧に負けない心身の健康管理',
                '💎 40代の貫禄と健康美の両立で存在感UP',
                '🏛️ 人生後半戦を健康で乗り切る体づくり'
            ],
            '女性': [
                '👑 40代女性の上品な美しさで年下からも憧れられる',
                '🌹 更年期を美しく乗り切る健康・美容法',
                '💖 40代からの新しい美しさで人生を再スタート',
                '🌸 年齢を重ねても輝き続ける秘訣を習得'
            ],
            'すべて': [
                '🎭 40代の成熟した魅力と健康美の完璧な融合',
                '💡 年齢に負けない若々しさをキープする秘訣',
                '🏆 40代からでも遅くない！理想の体と美しさを',
                '⭐ 人生の黄金期を健康で美しく過ごす方法'
            ]
        }
    },
    'ビジネス・投資': {
        '20代': {
            '男性': [
                '💰 20代で年収1000万への現実的ロードマップ',
                '🚀 起業・副業で同世代を圧倒する収入源構築',
                '⚡ 投資の複利効果を20代から最大活用',
                '🎯 将来の経済的自由を20代で設計する'
            ],
            '女性': [
                '✨ 女性の感性を活かした新しいビジネスモデル',
                '👩‍💼 20代女性の経済的自立で人生の選択肢を拡大',
                '💎 美容・ライフスタイル分野での収益化術',
                '🌸 恋愛・結婚に左右されない経済基盤構築'
            ],
            'すべて': [
                '🚀 20代の時間を味方につけた資産形成術',
                '💡 若さとデジタルネイティブ力で新市場開拓',
                '⭐ 小額から始めて大きく育てる投資戦略',
                '🌟 20代で築く一生安泰の資産ポートフォリオ'
            ]
        }
    },
    'その他': [
        '人生の質を向上させる実践的価値',
        '日常を豊かにする新しい発見',
        '自分らしい生き方を見つける',
        '充実感と満足感のある毎日を'
    ]
};

// キャッチコピー生成関数
function generateCatchphrase() {
    // フォームデータ取得
    const form = document.getElementById('profileForm');
    const formData = new FormData(form);
    
    profileData = {
        personality: formData.get('personality'),
        achievements: formData.get('achievements'),
        skills: formData.get('skills'),
        gender: formData.get('gender'),
        targetGender: formData.get('targetGender'),
        targetAge: formData.get('targetAge'),
        others: formData.get('others')
    };

    // バリデーション
    if (!profileData.personality || !profileData.achievements || !profileData.skills || 
        !profileData.gender || !profileData.targetGender || !profileData.targetAge) {
        alert('必須項目をすべて入力してください。');
        return;
    }

    // ローディング状態
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '生成中...';
    button.disabled = true;

    // キャッチコピー生成
    setTimeout(() => {
        const templates = catchphraseTemplates[profileData.gender][profileData.targetGender][profileData.targetAge];
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        
        generatedCatchphrase = randomTemplate
            .replace(/{skills}/g, profileData.skills)
            .replace(/{personality}/g, profileData.personality)
            .replace(/{achievements}/g, profileData.achievements);

        // 結果表示
        document.getElementById('catchphraseOutput').textContent = generatedCatchphrase;
        document.getElementById('catchphraseResult').style.display = 'block';
        document.getElementById('step2').style.display = 'block';

        // ボタン復元
        button.textContent = originalText;
        button.disabled = false;

        // スムーズスクロール
        document.getElementById('step2').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

// 商品カテゴリー変更時の価格自動設定
document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('productCategory');
    const priceInput = document.getElementById('productPrice');
    
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const category = this.value;
            if (category && categoryPrices[category]) {
                const price = categoryPrices[category].average;
                priceInput.value = price;
            }
        });
    }
});

// 価格編集機能
function editPrice() {
    const priceInput = document.getElementById('productPrice');
    const editButton = event.target;
    
    if (priceInput.readOnly) {
        priceInput.readOnly = false;
        priceInput.focus();
        editButton.textContent = '確定';
        document.body.classList.add('price-edit-mode');
    } else {
        priceInput.readOnly = true;
        editButton.textContent = '価格を編集';
        document.body.classList.remove('price-edit-mode');
    }
}

// LP生成関数
function generateLP() {
    // フォームデータ取得
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    
    productData = {
        name: formData.get('productName'),
        category: formData.get('productCategory'),
        price: formData.get('productPrice'),
        description: formData.get('productDescription')
    };

    // バリデーション
    if (!productData.name || !productData.category || !productData.price) {
        alert('必須項目をすべて入力してください。');
        return;
    }

    // ローディング状態
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'LP生成中...';
    button.disabled = true;

    // LP生成
    setTimeout(() => {
        generatedLP = generateLPHTML();

        // 結果表示
        document.getElementById('lpOutput').innerHTML = generatedLP;
        document.getElementById('lpResult').style.display = 'block';

        // ボタン復元
        button.textContent = originalText;
        button.disabled = false;

        // スムーズスクロール
        document.getElementById('lpResult').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// LP HTML生成関数
function generateLPHTML() {
    // 年齢・性別・カテゴリーに基づいたベネフィット取得
    let benefits;
    const categoryBenefits = benefitTemplates[productData.category];
    
    if (categoryBenefits && categoryBenefits[profileData.targetAge] && categoryBenefits[profileData.targetAge][profileData.targetGender]) {
        benefits = categoryBenefits[profileData.targetAge][profileData.targetGender];
    } else if (categoryBenefits && categoryBenefits[profileData.targetAge] && categoryBenefits[profileData.targetAge]['すべて']) {
        benefits = categoryBenefits[profileData.targetAge]['すべて'];
    } else {
        benefits = benefitTemplates['その他'];
    }
    
    const selectedBenefits = benefits.slice(0, 4);

    return `
        <div class="lp-container">
            <div class="lp-header">
                <h1>${generatedCatchphrase}</h1>
                <div class="lp-hero">
                    <h2>${productData.name}</h2>
                    <p class="lp-price">特別価格: ¥${parseInt(productData.price).toLocaleString()}</p>
                </div>
            </div>
            
            <div class="lp-benefits">
                <h3>${profileData.targetAge}の${profileData.targetGender === 'すべて' ? 'あなた' : profileData.targetGender}が手に入れる価値</h3>
                <ul>
                    ${selectedBenefits.map(benefit => `<li>✓ ${benefit}</li>`).join('')}
                </ul>
            </div>
            
            <div class="lp-profile">
                <h3>提供者プロフィール</h3>
                <p><strong>実績:</strong> ${profileData.achievements}</p>
                <p><strong>専門分野:</strong> ${profileData.skills}</p>
                <p><strong>特徴:</strong> ${profileData.personality}</p>
                ${profileData.others ? `<p><strong>その他:</strong> ${profileData.others}</p>` : ''}
            </div>
            
            <div class="lp-product">
                <h3>商品について</h3>
                <p><strong>商品名:</strong> ${productData.name}</p>
                <p><strong>カテゴリー:</strong> ${productData.category}</p>
                ${productData.description ? `<p><strong>詳細:</strong> ${productData.description}</p>` : ''}
            </div>
            
            <div class="lp-cta">
                <h3>${profileData.targetAge}の${profileData.targetGender === 'すべて' ? 'あなた' : profileData.targetGender}の人生を変える時がきました！</h3>
                <p>この機会を逃さず、理想の未来への第一歩を踏み出してください。</p>
                <button class="cta-button">今すぐ${productData.name}を始める</button>
                <p class="lp-price">特別価格: ¥${parseInt(productData.price).toLocaleString()}</p>
                <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 10px;">
                    ※ ${profileData.targetAge}限定の特別価格です
                </p>
            </div>
        </div>
        
        <style>
        .lp-container {
            max-width: 600px;
            margin: 0 auto;
            font-family: inherit;
        }
        
        .lp-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .lp-header h1 {
            color: #2d3748;
            font-size: 1.5rem;
            margin-bottom: 20px;
            line-height: 1.4;
        }
        
        .lp-hero h2 {
            color: #667eea;
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        .lp-price {
            font-size: 1.5rem;
            color: #e53e3e;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .lp-benefits,
        .lp-profile,
        .lp-product,
        .lp-cta {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .lp-benefits h3,
        .lp-profile h3,
        .lp-product h3,
        .lp-cta h3 {
            color: #2d3748;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .lp-benefits ul {
            list-style: none;
            padding: 0;
        }
        
        .lp-benefits li {
            padding: 8px 0;
            font-size: 1.1rem;
            color: #4a5568;
        }
        
        .lp-profile p,
        .lp-product p {
            margin-bottom: 10px;
            line-height: 1.6;
        }
        
        .lp-cta {
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .cta-button {
            background: white;
            color: #667eea;
            border: none;
            padding: 15px 40px;
            font-size: 1.2rem;
            font-weight: bold;
            border-radius: 50px;
            cursor: pointer;
            margin: 20px 0;
            transition: transform 0.3s ease;
        }
        
        .cta-button:hover {
            transform: scale(1.05);
        }
        </style>
    `;
}

// LP ダウンロード機能
function downloadLP() {
    const lpContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productData.name} - ランディングページ</title>
    <meta property="og:title" content="${productData.name}">
    <meta property="og:description" content="${generatedCatchphrase}">
    <meta property="og:type" content="website">
    <style>
        body {
            font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', 'Meiryo', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: #f8f9fa;
        }
        ${document.querySelector('#lpOutput style').textContent}
    </style>
</head>
<body>
    ${document.querySelector('#lpOutput .lp-container').outerHTML}
</body>
</html>
    `;

    const blob = new Blob([lpContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${productData.name}_LP.html`;
    a.click();
    URL.revokeObjectURL(url);
}

// プログレス表示
function updateProgress(step) {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const progress = (step / 2) * 100;
        progressBar.style.width = progress + '%';
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('自己紹介・LP自動生成ツールが初期化されました');
    
    // プログレスバーを追加
    const container = document.querySelector('.container');
    if (container) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = '<div class="progress-bar"></div>';
        container.insertBefore(progressContainer, container.firstChild);
    }
});