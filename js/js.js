// defintion des variable globales
var ra = Raphael("holder", "1000", "500"), balls = new Array(), counttirage=0, posbaseX = 100, posbaseY = 300, espace = 350, NbbyLigne = 4, iY = 0, iX=0, tempX = 0, tempY = 0, Rballs = 50, DefinedColor = 5;

//fonction reinit
init = function ()
{
    ra.clear();
    balls = new Array(), counttirage=0, posbaseX = 100, posbaseY = 300, espace = 350, NbbyLigne = 4, iY = 0, iX=0, tempX = 0, tempY = 0, Rballs = 50;
    ra.createBocal(0,300,300);
    ra.createBocal(espace,300,300);
}

// definitions des varriable pour la creation du cadre et des balls
Raphael.fn.ball = function (x, y, r, hue) {
    hue = hue || 0;
    return this.set( //code permettant la création d'une balle
        this.ellipse(x, y + r - r / 5, r, r / 2).attr({fill: "rhsb(" + hue + ", 1, .25)-hsb(" + hue + ", 1, .25)", stroke: "none", opacity: 0}),
        this.ellipse(x, y, r, r).attr({fill: "r(.5,.9)hsb(" + hue + ", 1, .75)-hsb(" + hue + ", .5, .25)", stroke: "none"}),
        this.ellipse(x, y, r - r / 5, r - r / 20).attr({stroke: "none", fill: "r(.5,.1)#ccc-#ccc", opacity: 0})
    );
};
Raphael.fn.createBocal = function (x, sizeX, sizeY) {
    var position_x = 50+x;
    return this.set(
        this.path("M"+position_x+" 50l0 "+sizeY+"l"+sizeX+" 0l0 -"+sizeY+"").attr({'stroke-width':10, stroke : '#B34'})
    );
};
//verifiacation et allocation du nombre de balls par ligne
calculateBalls = function (nbballs)
{
    if (nbballs<16)
    {
        NbbyLigne = 4;
        Rballs = 33;
    }
    else if (nbballs<= 25)
    {
        NbbyLigne = 5;
        Rballs = 26;
    }
    else if (nbballs<= 36)
    {
        NbbyLigne = 6;
        Rballs = 20;
    }
    else if (nbballs<= 49)
    {
        NbbyLigne = 7;
        Rballs = 17;
    }
    else if (nbballs<= 64)
    {
        NbbyLigne = 8;
        Rballs = 15;
    }
    else if (nbballs<= 81)
    {
        NbbyLigne = 9;
        Rballs = 13 ;
    }
    else if (nbballs <= 100)
    {
        NbbyLigne = 10;
        Rballs = 11;
    }
    else if (nbballs > 100)
    {
        NbbyLigne = 0;
        Rballs = 0;
    }
}
generateBalls = function(NbBalls, DefinedColorfn,stOrSc )
{
    DefinedColor = DefinedColorfn;
    //compteur de nombre pour les boucles initié a 0
    var ballsAdd = 0;
    if ( stOrSc == true)
    {
        posbaseY = 300;
        var temp = 0;
        posbaseX = 100;
        temp = posbaseX;
        posbaseX = temp + espace;
    }
    else
    {
        init();
    }
    iY = 0;
    iX = 0;
    tempX = 0;
    tempY = 0;
    //Calcule des grosser de balles généré
    calculateBalls(NbBalls);
    while (iY< NbBalls)
    {
        while (iX < NbbyLigne)
        {
            if ( ballsAdd == NbBalls ) // si le nombre de balle definit est egale ou nombre de balle généré -> arret
            {
                iX = NbbyLigne; // on rend les boucle vrai pour qu'elles s'arrete
                iY = NbBalls;
            }
            else //sinon on crée une balle suplementaire avec les bonne coordonée
            {
                ra.ball(posbaseX, posbaseY, Rballs , randomColor(DefinedColorfn));

                //mise a niveau des varriable pour les balles suivantes
                tempX = posbaseX;
                posbaseX = tempX + Rballs + Rballs ;
                iX++;
                ballsAdd++;
            }

        } // fin d'une ligne de balles

        // on ajoute une ligne puis la boucles repart pour créer des balles avec des valeur de posistion permettant d'augmenter d'une ligne
        iX= 0;
        if ( stOrSc == true)
        {
            var temp;
            posbaseX = 100 + espace;
        }
        else
        {
            posbaseX = 100;
        }

        tempY = posbaseY;
        posbaseY = tempY - Rballs - Rballs;
        iY++;
    }
}

randomColor = function (NbOfCOlors) { // fonction pour choisir une couleur parmis 5
    //definitions des listes de coleurs
    var ColorsFive = new Array('0.3', '0.5', '0.8', '0.9' , '0.7'), ColorsFour = new Array('0.3', '0.5', '0.9', '0.7'), ColorsThree = new Array('0.3', '0.5', '0.9'), ColorsTwo = new Array('0.3', '0.8'), ColorOne = new Array('0.5');

    var chosedColor=Math.ceil(Math.random()*NbOfCOlors);
    //traitement du choix et retour de la couleur choisi aleatoirment
    if (NbOfCOlors == 1)
    {
        return ColorOne[chosedColor];
    }
    else if (NbOfCOlors == 2)
    {
        return ColorsTwo[chosedColor];
    }
    else if(NbOfCOlors == 3)
    {
        return ColorsThree[chosedColor];
    }
    else if (NbOfCOlors == 4)
    {
        return ColorsFour[chosedColor];
    }
    else if (NbOfCOlors ==5)
    {
        return ColorsFive[chosedColor];
    }
    else
    {
    }
}

//lancement des foncitons et varrible de base pour l'affichage
window.onload = function () {

    //creation du cadre
    init();

    //calcul de la taille des balls avec valeur par default
    //generateBalls(15, false); //sera remplacer par le contenu numerique du input prevu
    //chooseRandomBall();
}