using System.Collections;
using System.Collections.Generic;
using UnityEngine;


namespace Zkwokleung.MiniGames.SpinningPuzzles
{
    public class PlayerArea : MonoBehaviour
    {

        public void OnBtnClicked(int pos)
        {
            GameManager.Instance.Spin((ControlPositionEnum)pos, GameManager.Instance.Direction);
        }

        public void OnPointerEnter(int pos)
        {
            GameManager.Instance.SetIndicatorOn((ControlPositionEnum)pos);
        }

        public void OnPointerExit(int pos)
        {
            GameManager.Instance.SetIndicatorOn((ControlPositionEnum)pos);
        }
    }
}