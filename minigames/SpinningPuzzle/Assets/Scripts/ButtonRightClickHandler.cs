using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

namespace Zkwokleung.MiniGames.SpinningPuzzles
{
    public class ButtonRightClickHandler : MonoBehaviour, IPointerClickHandler
    {
        public ControlPositionEnum pos;

        public void OnPointerClick(PointerEventData eventData)
        {
            if (eventData.button == PointerEventData.InputButton.Right)
            {
                GameManager.Instance.Spin(pos, (SpinDirectionEnum)(1 - (int)GameManager.Instance.Direction));
            }
        }
    }
}