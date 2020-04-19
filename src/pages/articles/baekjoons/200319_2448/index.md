---
title: "[백준] 2448 : 별 찍기 - 11"
date: "2020-03-19"
layout: post
draft: false
path: "/posts/baekjoons/2448/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 2448번 문제 : 별 찍기 - 11"
---

# 2448번 : 별 찍기 - 11

👉 [문제 바로가기](https://www.acmicpc.net/problem/2448)



## 배경 지식
- `프랙탈(자기 닮음 도형)` : **자기유사성**을 갖는 기하학적 구조; 어떤 도형의 작은 일부를 확대 했을 때 전체 모습이 똑같이 반복되는 도형
- `재귀 함수` : 함수에서 자신을 다시 호출하는 **재귀호출(recursive call)** 작업을 수행하는 함수


## 푼 방법
별 찍기 문제 중 규칙 찾기에 가장 고민을 많이한 문제이다.

프랙탈 구조로 이루어진 삼각형이다. **큰삼각형 안에 동일한 구조의 작은 삼각형이 세 꼭지점에 반복되는 구조**다.

재귀함수를 이용, **각 삼각형의 맨 위 꼭대기 좌표를 매개변수로 넘겨 윗 삼각형, 왼쪽 아래 삼각형, 오른쪽 아래 삼각형을 계속 출력**해 나간다.



## 내 정답 코드 (C++)
~~~c
#include <iostream>

char star[3072][3072*2-1];

void print_star(int n, int x, int y) { // 현 삼각형 높이, 현 삼각형 맨 위 꼭지점의 x 좌표, 현 삼각형 맨 위 꼭지점의 y 좌표
	if (n == 3) { // 높이가 3이면 단위 삼각형 출력
		star[y][x] = '*';
		star[y+1][x-1] = '*';
		star[y+1][x+1] = '*';
		star[y+2][x-2] = '*';
		star[y+2][x-1] = '*';
		star[y+2][x] = '*';
		star[y+2][x+1] = '*';
		star[y+2][x+2] = '*';
		return;
	}
	
	print_star(n/2, x, y); // 현 삼각형의 윗 꼭지점 작은 삼각형 출력
	print_star(n/2, x-(n/2), y+(n/2)); // 현 삼각형의 왼쪽 아래 꼭지점 작은 삼각형 출력
	print_star(n/2, x+(n/2), y+(n/2)); // 현 삼각형의 오른쪽 아래 꼭지점 작은 삼각형 출력
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n;
	
	std::cin >> n;
	
	for (int i = 0; i < n; ++i) { // 배열 초기화
		for (int j = 0; j < n*2-1; ++j)
			star[i][j] = ' ';
	}

	print_star(n, n-1 ,0);
	
	for (int i = 0; i < n; ++i) { // 출력
		for (int j = 0; j < n*2-1; ++j)
			std::cout << star[i][j];
		std::cout << '\n';
	}
    
    return 0;
}
~~~

### References
https://m.blog.naver.com/alwaysneoi/100135570568