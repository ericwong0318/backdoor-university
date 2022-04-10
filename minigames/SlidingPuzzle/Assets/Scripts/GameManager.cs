using System.Collections;
using System.Collections.Generic;
using UnityEngine;


namespace Zkwokleung.Minigames.SlidingPuzzles
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; set; }

        [SerializeField] private List<Tile> tiles;
        [SerializeField] private List<QuestionData> questions;

        public int EmptyPos;

        Coroutine m_timerCoroutine;

        private void Awake()
        {
            Instance = this;
        }

        public void StartNewGame()
        {

        }

        public void Shuffle()
        {
            // Shuffle the list of index and apply the index to the image
            System.Random rng = new System.Random();
            List<int> idx = new List<int>() { 0, 1, 2, 3, 4, 5, 6, 7, 8 };
            int n = idx.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                int value = idx[k];
                idx[k] = idx[n];
                idx[n] = value;
            }
            for (int i = 0; i < 9; i++)
            {
                SetImage(i, idx[i]);
            }
        }

        public void StartTimer()
        {
            StopTimer();
            m_timerCoroutine = StartCoroutine(IEStartTimer());
        }

        public void StopTimer()
        {
            if (m_timerCoroutine != null)
            {
                StopCoroutine(m_timerCoroutine);
            }
        }

        public void ResetTimer()
        {
            TimerValue = 0;
        }


        public void MovePuzzle(int pos)
        {

        }
    }
}