using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace Zkwokleung.Minigames.SlidingPuzzles
{
    [RequireComponent(typeof(Image))]
    public class Tile : MonoBehaviour
    {
        public Sprite Sprite => GetComponent<Image>().sprite;
        public string ImageId => Sprite.name[Sprite.name.Length - 1].ToString();
    }
}