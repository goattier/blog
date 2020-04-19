---
title: "[백준] 11653 : 소인수분해"
date: "2020-03-13"
layout: post
draft: false
path: "/posts/baekjoons/11653/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 11653번 문제 : 소인수분해"
---

# 11653번 : 소인수분해

👉 [문제 바로가기](https://www.acmicpc.net/problem/11653)



## 배경 지식
- `소인수분해` : 합성수를 소수(Prime Number)의 곱으로 나타내는 방법; 소인수(Prime Factor)를 구하는 것
- `에라토스테네스의 체 (Sieve of Eratosthenes)` : 

![에라토스테네스의 체](./Sieve_of_Eratosthenes_animation.gif)

## 푼 방법
**에라토스테네스의 체를 이용하여 주어진 숫자까지의 소수들을 다 구하고, 주어진 숫자를 구한 소수들로 나눠가며 몫이 1이 될때까지 소인수분해를 한다. (나누어 떨어지는 소수만 출력, 주어진 수는 나눈 후의 몫이되며 계속 감소)**

문제를 풀 때 에라토스테네스의 체가 제일 먼저 떠올라 이렇게 풀었지만, 사실 메모리와 시간을 더 적게 쓰면서 풀 수 있는 문제이다.

그 방법은, **2부터 시작하여 주어진 수의 제곱근까지 위와 같은 방식으로 소인수분해를 해나간다.**

## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <vector>
#include <deque>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n;
	
	std::cin >> n;
	
	std::vector<bool> is_prime_num(n+1, true);
	std::deque<int> prime_num;
	
	for(int i = 2; i <= n; ++i) { // 에라토스테네스의 체
		if (is_prime_num[i] == false)
			continue;
		else {
			prime_num.emplace_back(i); // 소수만 따로 deque(.pop_front() 메소드 이용 위해)에 저장 
			
			for (int j = i; j <= n; j+=i) {
				if (is_prime_num[j] == true)
					is_prime_num[j] = false;
			}	
		}
	}
	
	while (n != 1) {
		if (n % prime_num[0] == 0) {
			std::cout << prime_num[0] << '\n';
			n /= prime_num[0];
		}
		else
			prime_num.pop_front();
	}
    
    return 0;
}
~~~

### References
https://ledgku.tistory.com/61
