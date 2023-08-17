import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

import lo from 'lodash'
import { Loading, Error } from '../utils/components'
import ServerInfo from './ServerInfo'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stats: props?.stats || null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(!lo.isEqual(prevProps.stats, this.props.stats)) {
            this.setState({stats: lo.cloneDeep(this.props.stats)})
        }
    }

    render() {
        const {loadingStats, errorStats} = this.props
        const {stats} = this.state

        return <Container>
            <Row>
                <Col xs={12}>
                    {loadingStats ? <Loading /> : errorStats ? <Error error={errorStats} /> : stats ? <ServerInfo serverStats={stats} /> : null}
                </Col>
                <div>
                    <h1>Bienvenue sur le site KCDQB</h1>
                    <p>
                        Si t'as pas le temps, et que tu veux télécharger le modpack, c'est par <a href="/downloads">ici</a>.
                        <br />
                        Il est possible que tu doives aussi installer des mises à jour du modpack (ce sont des mods qu'on a ajouté au fur et à mesure). Pour ça, rien de plus simple, tu télécharges les packs qui s'appellent <em>modpack_update_X.zip</em> depuis la <a href="/downloads">page de téléchargements</a>. "X" représente un numéro de mise à jour, c'est pas compliqué, il faut TOUS les installer. Donc si y a par exemple un <em>modpack_update_4.zip</em> de dispo, il faut que t'installes les updates précédentes aussi pour être à jour. Voilà, on vous tiendra au courant des mises à jour sur Discord si besoin.                   
                    </p>
                    <p>
                        Pour jouer sur le serveur, il va falloir que tu installes Forge via l'installer contenu dans le fichier <em>client-mods.zip</em> (<a href="/downloads">Page de téléchargements</a>) et que tu copies le dossier <em>mods</em> dans ton dossier minecraft. Pour ce faire : <br />
                        <pre>Win + R {'>'} "%appdata%" {'>'} .minecraft</pre>
                        Si tu as déjà un dossier <em>mods</em> ici, je t'invite à le mettre de côté pour plus tard si besoin, si tu sais pas ce que ça fout là, tu peux sûrement le supprimer sans souci. Copie ensuite le dossier <em>mods</em> contenu dans l'archive <em>client-mods.zip</em> dans le dossier <em>.minecraft</em>
                    </p>
                    <p>
                        Une fois que ça c'est fait, t'es 'fin prêt pour casser du cube. Lance Minecraft via le profil que Forge aura créé (Si tu te sens de le modifier pour y ajouter de la ram, ça sera pas de trop, on parle de près de 150 mods là), et connecte toi à l'adresse <em>kcdqb.fr</em> (ou bien si ça ne marche pas, à l'ip qui s'affiche en haut de cette page).<br />
                        <em>Si tu as un souci avec la whitelist, contacte quelqu'un qui à les droits ça va aller vite normalement.</em><br />
                        <em>Et si le modpack marche pas, c'est sûrement de ta faute, parce que c'est censé marcher, revérifie bien chaque étape ci-dessus, et en cas de vrai gros souci, contacte quelqu'un sur discord qui sait s'y prendre.</em>
                    </p>
                </div>
                <div>
                    <h1>Liens utiles de téléchargement</h1>
                    <hr />
                    <p>
                        Ci-dessous, quelques liens sympas pour améliorer ton expérience de jeu sur le serveur. Un resource pack qui va grandement améliorer la fidélité visuelle, et un shader pack si jamais t'as un vrai G@m3r et que tu veux faire cramer ta CG jeune.
                    </p>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <a href="https://minecraft.fr/faithful-32x32/">Faithful Resource Pack</a>
                        <a href="https://www.curseforge.com/minecraft/customization/complementary-reimagined">Complementary Reimagined (shader pack)</a>
                    </div>
                </div>
            </Row>
        </Container>
    }
}

Home.propTypes = {
    stats: PropTypes.object,
    loadingStats: PropTypes.bool,
    errorStats: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}

export default Home