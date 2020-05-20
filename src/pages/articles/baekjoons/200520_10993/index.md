---
title: "[백준] 10993 : 별 찍기 - 18"
date: "2020-05-20"
layout: post
draft: false
path: "/posts/baekjoons/10993/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 10993번 문제 : 별 찍기 - 18"
---

# 10993번 : 별 찍기 - 18

👉 [문제 바로가기](https://www.acmicpc.net/problem/10993)


## 배경 지식
 - `약간의 수학적 사고력`


## 푼 방법
**별이 찍히는 규칙을 찾아내는 것**이 관건인 문제다.

내가 찾은 규칙은 아래와 같다.
> #### 가로 : 2^(n+1) - 3, 세로 : 2^n - 1  


입력받는 **n이 홀수**이면 **중심 별(삼각형의 윗 꼭지점)에서 아래로 별을 찍고**, **n이 짝수**이면 **중심 별에서 위로 별을 찍고** 마지막으로 **삼각형의 밑변은 모두 별로 채워서 찍어주면 된다.**

P.S. 배열의 index가 0부터 시작해서 코드가 좀 더러울 수 있다! 주의하세요!

## 내 정답 코드 (C++)
~~~c
#include <iostream>
#include <cmath>

char triangle[2045][2045] = {' '};

//2^n -1  2^(n+1) - 3
void draw_star(int n, int x, int y, bool dir) {
	int left = y, right = y, i;

	triangle[x][y] = '*';
	
	if (n == 1) return;
	
	if (n % 2) { // odd = down
		for (i = 1; i < std::pow(2, n) - 1; ++i) {
			triangle[x+i][--left] = '*';
			triangle[x+i][++right] = '*';
		}
		
		for (int j = left + 1; j < right; ++j)
			triangle[x + (i - 1)][j] = '*';
		
		draw_star(n-1, x + (std::pow(2, n) - 3), y, !dir);
	} else { // even = up
		for (i = 1; i < std::pow(2, n) - 1; ++i) {
			triangle[x-i][--left] = '*';
			triangle[x-i][++right] = '*';
		}
		
		for (int j = left + 1; j < right; ++j)
			triangle[x - (i - 1)][j] = '*';
		
		draw_star(n-1, x - (std::pow(2, n) - 3), y, !dir);
    }
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n;
	
	std::cin >> n;
	
	for (int i = 0; i < 2045; ++i) {
		for (int j = 0; j < 2045; ++j)
			triangle[i][j] = ' ';
	}
	
	// true = odd = down , false = even = up
	n % 2 ? draw_star(n, 0, std::pow(2, n) - 2, true) : draw_star(n, std::pow(2, n) - 2, std::pow(2, n) - 2, false);
	
	if (n % 2) {
		for (int i = 0; i < std::pow(2, n) - 1; ++i) {
			for (int j = 0; j < (std::pow(2, n) - 1) + i; ++j)
				std::cout << triangle[i][j];
			std::cout << '\n';
		}
	}
	else {
		for (int i = 0; i < std::pow(2, n) - 1; ++i) {
			for (int j = 0; j < (std::pow(2, n+1) - 3) - i; ++j)
				std::cout << triangle[i][j];
			std::cout << '\n';
		}
	}
	
	return 0;
}
~~~
