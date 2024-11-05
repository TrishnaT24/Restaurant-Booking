import './Blocks.css'
import sizzler from '../images/smthng idk.jpg'
import dining from '../images/dining-table.jpg'
import drinks from '../images/drinks.jpg'
import lebanese from '../images/lebanon.jpg'
import thali from '../images/thali.jpg'
import thai from '../images/thai.jpg'
import dosa from '../images/dosa.jpg'

const blocks = [{
    heading: 'POP-TATES',
    description: 'The sizzlers at Pop Tates are a crowd favorite, known for their generous portions and sizzling presentation. Each dish combines grilled vegetables, spicy sauces, and a choice of meats or paneer, all served on a hot plate that enhances the flavors and aroma. It’s a perfect choice for those who enjoy a hearty, flavorful meal with a bit of flair!',
    image: sizzler,
    imageAlt: ""
}, {
    heading: 'SAZIO-THE LOUNGE',
    description: 'Drinks at Sazio offer a blend of classic cocktails, refreshing mocktails, and a curated selection of premium spirits. The menu caters to all tastes, whether you’re in the mood for a signature drink crafted by expert mixologists or a simple, elegant glass of wine. The relaxed atmosphere makes it an ideal spot to unwind and savor your drink.',
    image: drinks,
    imageAlt: ""
}, {
    heading: 'ONE 8 COMMUNE',
    description: 'Lebanese dishes at One8Commune typically feature fresh, vibrant flavors with an array of mezze like creamy hummus, smoky baba ghanoush, and crisp tabbouleh. You’ll often find mains such as tender grilled lamb or chicken shawarma, served with fluffy pita and garlic sauce. Lebanese cuisine emphasizes a balance of spices and herbs, offering a rich, aromatic dining experience.',
    image: lebanese,
    imageAlt: ""
}, {
    heading: 'SOCIAL',
    description: 'The Thai food at Social offers a vibrant blend of sweet, spicy, and savory flavors with dishes like pad Thai, green curry, and flavorful stir-fries. Each dish is crafted with authentic Thai spices and fresh ingredients, delivering a perfect balance of textures and tastes. Its a great spot to enjoy bold, aromatic Thai cuisine in a lively setting..',
    image: thai,
    imageAlt: ""
}, {
    heading: 'KUBERA',
    description: 'The thali at Kubera is a delightful spread that brings together a variety of traditional Indian flavors on one platter. Featuring a selection of curries, dals, rice, rotis, and sweets, each thali is a well-balanced, hearty meal. Its an authentic and satisfying experience, perfect for exploring a diverse range of tastes in one sitting.',
    image: thali,
    imageAlt: ""
}, {
    heading: 'BANANA LEAF',
    description: 'The dosas at Banana Leaf are a must-try, known for their perfect crispness and authentic South Indian flavors. Served with a variety of chutneys and sambar, each dosa is generously sized and filled with delicious options like spiced potatoes or paneer. Its a satisfying treat that captures the essence of traditional South Indian cuisine..',
    image: dosa,
    imageAlt: ""
}]

function Blocks () {
    return (
        <section className="blocks">
            <h2>OUR TOP SEARCHES</h2>
            {blocks.map((block, i) => (
                <article className="block" key={i}>
                    <div className="image-container">
                        <img src={block.image} alt={block.imageAlt} />
                    </div>
                    <div className="content">
                        <h3>{block.heading}</h3>
                        <p>{block.description}</p>
                    </div>
                </article>
            ))}
        </section>
    )
}

export default Blocks;