using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace Zkwokleung.MiniGames.SpinningPuzzles
{
    [RequireComponent(typeof(Image))]
    public class ImageTile : MonoBehaviour
    {
        #region Components
        private Image img => GetComponent<Image>();
        #endregion

        #region Public Property
        public Sprite Sprite { get => img.sprite; set => img.sprite = value; }
        public int ImageIndex { get; set; }
        public int TilePosition => (int)(gameObject.name[gameObject.name.Length - 1] - '0');
        #endregion
    }
}